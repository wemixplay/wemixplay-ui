#!/bin/bash

# 현재 브랜치 확인
current_branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$current_branch" = "main" ]; then
    echo "현재 브랜치가 main입니다. 최신 변경 사항을 가져옵니다."
    git pull origin main
else
    echo "현재 브랜치가 $current_branch 입니다. main 브랜치로 변경 후 배포 작업을 진행해주세요."
    exit 1
fi

# version 값 추출 (grep과 sed 사용)
version=$(grep '"version"' package.json | sed -E 's/.*"version": *"([^"]+)".*/\1/')

if [ -z "$version" ]; then
    echo "package.json에서 버전 정보를 찾을 수 없습니다. 파일을 확인하세요."
    exit 1
fi

echo "현재 버전: $version"

# IFS를 사용해 버전 분리
IFS='.' read -r major minor patch <<< "$version"

# 각 값을 숫자로 변환
major=$((major))
minor=$((minor))
patch=$((patch))

if [ -z "$major" ] || [ -z "$minor" ] || [ -z "$patch" ]; then
    echo "버전 정보를 올바르게 추출하지 못했습니다. 파일을 확인하세요."
    exit 1
fi

# 새 버전 계산
if [ "$patch" -lt 999 ]; then
    patch=$((patch + 1))
elif [ "$minor" -lt 999 ]; then
    minor=$((minor + 1))
    patch=0
else
    major=$((major + 1))
    minor=0
    patch=0
fi

# 새 버전 문자열 생성
auto_new_version="$major.$minor.$patch"

read -p "새로운 버전을 입력하세요 ( 자동 생성 버전: $auto_new_version ): " new_version

if [ -z "$new_version" ]; then
    new_version=$auto_new_version
fi

new_version = "npm-publish/$new_version"

git tag -a $new_version -m "Release $new_version"
git push origin $new_version
git tag -d $new_version

echo "버전 $new_version 배포 완료"
exit 0