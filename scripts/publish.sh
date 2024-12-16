#!/bin/bash

# 현재 브랜치 확인
current_branch=$(git rev-parse --abbrev-ref HEAD)

function print_string(){
  RED='\033[0;31m'
  GREEN='\033[0;32m'
  YELLOW='\033[1;33m'
  NC='\033[0m'

  if [ "$1" = "error" ]; then
    echo -e "${RED}${2}${NC}"
  elif [ "$1" = "success" ]; then
    echo -e "${GREEN}${2}${NC}"
  elif [ "$1" = "warning" ]; then
    echo -e "${YELLOW}${2}${NC}"
  fi
}

if [ "$current_branch" = "main" ] || [ "$current_branch" = "alpha" ]; then
    print_string "success" "현재 브랜치가 $current_branch 입니다. 최신 변경 사항을 가져옵니다."
    git pull origin main
else
    print_string "error" "현재 브랜치가 $current_branch 입니다. main이나 alpha 브랜치로 변경 후 배포 작업을 진행해주세요."
    exit 1
fi

# version 값 추출
version=$(grep '"version"' package.json | sed -E 's/.*"version": *"([^"]+)".*/\1/')

if [ -z "$version" ]; then
    print_string "error" "package.json에서 버전 정보를 찾을 수 없습니다. 파일을 확인하세요."
    exit 1
fi

# 버전과 태그 분리
IFS='-' read -r version_num npm_tag <<< "$version"

# 버전 번호를 major, minor, patch로 분리
IFS='.' read -r major minor patch <<< "$version_num"

# 각 값을 숫자로 변환
major=$((major))
minor=$((minor))
patch=$((patch))
tag=$([ "$current_branch" = "main" ] && echo "latest" || echo "alpha")
tag_str=$([ "$tag" = "latest" ] && echo "" || echo "-alpha")

if [ -z "$major" ] || [ -z "$minor" ] || [ -z "$patch" ]; then
    print_string "error" "버전 정보를 올바르게 추출하지 못했습니다. 파일을 확인하세요."
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
auto_new_version="$major.$minor.$patch${tag_str}"

read -p "새로운 버전을 입력하세요 ( 자동 생성 버전: $auto_new_version ): " new_version

if [ -z "$new_version" ]; then
    new_version=$auto_new_version
else
    # tag_str이 비어있지 않다면 new_version 뒤에 tag_str 추가
    if [ -n "$tag_str" ]; then
        # new_version에 이미 tag_str이 포함되어 있는지 확인
        if [[ "$new_version" != *"$tag_str"* ]]; then
            new_version="${new_version}${tag_str}"
        fi
    fi
fi

tag_version="npm-publish/$new_version"

yarn version --new-version $new_version --tag $tag --no-git-tag-version

git add package.json

git commit -m "update version to $new_version"
git push origin main

git tag -a $tag_version -m "Release $new_version"
git push origin $tag_version
git tag -d $tag_version

print_string "success" "✨🎉 v $new_version 배포 완료 🎉✨"
exit 0
