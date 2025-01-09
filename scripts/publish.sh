#!/bin/bash

###################
# 유�리티 함수들 #
###################

# 컬러 출력 함수
function print_string(){
  local RED='\033[0;31m'
  local GREEN='\033[0;32m'
  local YELLOW='\033[1;33m'
  local NC='\033[0m'

  case "$1" in
    "error") echo -e "${RED}${2}${NC}" ;;
    "success") echo -e "${GREEN}${2}${NC}" ;;
    "warning") echo -e "${YELLOW}${2}${NC}" ;;
  esac
}

# 버전 파일(version.json or version.alpha.json ...)에서 버전 추출
function extract_version() {
    local version_file=$1
    local version=$(grep "\"version\":" $version_file | sed -E "s/.*\"version\": *\"([^\"]+)\".*/\1/")
    echo $version
}

# 버전 유효성 검사
function validate_version() {
    local version=$1
    local version_regex="^[0-9]+\.[0-9]+\.[0-9]+(-alpha)?$"
    if [[ ! "$version" =~ $version_regex ]]; then
        print_string "error" "올바른 버전 형식이 아닙니다. 형식: number.number.number 또는 number.number.number-alpha"
        return 1
    fi
    return 0
}

# 버전 파일(version.json or version.alpha.json ...) 업데이트
function update_version_file() {
    local version_file=$1
    local new_version=$2
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/\"version\": *\"[^\"]*\"/\"version\": \"$new_version\"/" $version_file
    else
        sed -i "s/\"version\": *\"[^\"]*\"/\"version\": \"$new_version\"/" $version_file
    fi
}

# Git tag 작업 수행
function git_tag_work() {
    local current_branch=$1
    local new_version=$2
    local tag_version=$3

    git pull origin $current_branch || { print_string "error" "Git pull 실패"; return 1; }
    git add -f package.json ./dist || { print_string "error" "Git add 실패"; return 1; }
    git commit --allow-empty -m "update version to $new_version" || { print_string "error" "Git commit 실패"; return 1; }
    git push origin $current_branch || { print_string "error" "Git push 실패"; return 1; }
    
    git tag -a $tag_version -m "Release $new_version" || { print_string "error" "Git tag 실패"; return 1; }
    git push origin $tag_version || { print_string "error" "Git tag push 실패"; return 1; }
    git tag -d $tag_version || { print_string "error" "Git tag 삭제 실패"; return 1; }
    
    return 0
}

# 다음 버전 계산
function calculate_next_version() {
    local major=$1
    local minor=$2
    local patch=$3
    local tag_str=$4

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

    echo "$major.$minor.$patch${tag_str}"
}

# 빌드 프로세스
function build_project() {
    print_string "warning" "프로젝트 빌드 중..."
    [ -d "dist" ] && rm -rf dist
    yarn cache clean && yarn && yarn build || { 
        print_string "error" "빌드 실패"
        return 1
    }
    print_string "success" "패키지 설치 및 빌드 완료"
    return 0
}

# 완료 메시지 출력
function print_completion_message() {
    local new_version=$1
    local tag=$2
    
    print_string "success" "=================================="
    print_string "success" "✨🎉 v $new_version 배포 완료 🎉✨"
    print_string "success" "=================================="
    print_string "warning" "wemixplay-ui를 사용하는 프로젝트에서 아래 명령어를 실행해주세요!"
    print_string "success" "=================================="
    print_string "success" "npm install wemixplay-ui@${tag}"
    print_string "success" "yarn add wemixplay-ui@${tag}"
    print_string "success" "=================================="
}

#######################
# 메인 스크립트 실행 #
#######################

# 브랜치 및 태그 설정
current_branch=$(git rev-parse --abbrev-ref HEAD)
tag=$([ "$current_branch" = "main" ] && echo "latest" || echo "alpha")
tag_str=$([ "$tag" = "latest" ] && echo "" || echo "-alpha")

# version 파일 설정
version_file="version.json"
[ "$tag_str" = "-alpha" ] && version_file="version.alpha.json"

# 브랜치 검증
if [ "$current_branch" = "main" ] || [ "$current_branch" = "alpha" ]; then
    print_string "success" "현재 브랜치가 $current_branch 입니다. version 파일만 원격의 최신 내용으로 업데이트합니다."
    git fetch origin $current_branch
    git checkout origin/$current_branch -- $version_file
else
    print_string "error" "현재 브랜치가 $current_branch 입니다. main이나 alpha 브랜치로 변경 후 배포 작업을 진행해주세요."
    exit 1
fi

# 현재 버전 추출
version=$(extract_version $version_file)
[ -z "$version" ] && { print_string "error" "$version_file에서 버전 정보를 찾을 수 없습니다."; exit 1; }

# 버전 파싱
IFS='-' read -r version_num npm_tag <<< "$version"
IFS='.' read -r major minor patch <<< "$version_num"

# 버전 번호 검증
major=$((major))
minor=$((minor))
patch=$((patch))
export NPM_PUBLISH_TAG=$tag

[ -z "$major" ] || [ -z "$minor" ] || [ -z "$patch" ] && {
    print_string "error" "버전 정보를 올바르게 추출하지 못했습니다."
    exit 1
}

# 새 버전 생성
auto_new_version=$(calculate_next_version $major $minor $patch $tag_str)

# 사용자 입력 버전 처리
read -p "새로운 버전을 입력하세요 ( 자동 생성 버전: $auto_new_version ): " new_version

new_version=${new_version:-$auto_new_version}
validate_version "$new_version" || exit 1

[[ -n "$tag_str" && "$new_version" != *"$tag_str"* ]] && new_version="${new_version}${tag_str}"
tag_version="npm-publish/$new_version"

# 빌드 실행
build_project || exit 1

# Git 작업 실행
last_git_work_status="normal"
git_tag_work "$current_branch" "$new_version" "$tag_version" || last_git_work_status="bad"

# version.json 업데이트
update_version_file "$version_file" "$new_version"

# version.json Git 작업
if [ "$last_git_work_status" = "normal" ]; then
    git add -f $version_file || { print_string "error" "Git version file add 실패"; last_git_work_status="bad"; }
    git commit -m "update $version_file" || { print_string "error" "Git version file commit 실패"; last_git_work_status="bad"; }
    git push origin $current_branch || { print_string "error" "Git version file push 실패"; last_git_work_status="bad"; }
fi

# 실패시 버전 롤백
if [ "$last_git_work_status" = "bad" ]; then
    update_version_file "$version_file" "$version"
    exit 1
fi

# 완료 메시지 출력
print_completion_message "$new_version" "$tag"
exit 0
