
#### Bootstrap ####

.PHONY: setup
setup:
	# if blog directory does not exist, clone the blog repository
	test -d blog || git clone https://github.com/lqhuang/blog --depth 1
	stat blog

#### Release ####

.PHONY: pre-build
pre-build: setup
	DOC_DIR="./blog/projects/2024-12-11-requests-scala-native-support-bounty"; \
	    cat $${DOC_DIR}/2025*.md >> $${DOC_DIR}/README.md

.PHONY: build
build:
	pnpm run build

.PHONY: cf-build
cf-build: pre-build build

.PHONY:
cf-deploy:
	pnpm run cf-deploy

#### Chore tasks ####

up-deps:
	pnpm update -iL

up-greedy:
	pnpm update --latest --filter=!@types/node

clean:
	rm -rf ./.next/ ./node_modules/ ./out/
