.PHONY: dev build clean install lint

# 开发环境启动
dev:
	npm run dev

# 构建项目
build:
	npm run build

# 安装依赖
install:
	npm install

# 清理构建文件和依赖
clean:
	rm -rf node_modules
	rm -rf dist
	rm -f package-lock.json

# 代码检查
lint:
	npm run lint

# 重新安装并启动
reset: clean install dev

# 帮助信息
help:
	@echo "可用命令："
	@echo "  make dev      - 启动开发服务器"
	@echo "  make build    - 构建项目"
	@echo "  make install  - 安装依赖"
	@echo "  make clean    - 清理项目"
	@echo "  make lint     - 代码检查"
	@echo "  make reset    - 重置并重启项目"