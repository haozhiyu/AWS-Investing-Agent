# Web3 Investment Advisor Chatbot






一个专为Web3投资者设计的智能聊天机器人，提供加密货币分析和投资建议。





## 项目概述





Web3 Investment Advisor是一个交互式聊天机器人应用，专门为加密货币投资者设计。它能够回答关于各种加密货币的问题，提供实时价格数据，并展示价格走势图表。该应用采用现代化的用户界面，支持深色/浅色主题，并针对各种设备尺寸进行了响应式设计优化。





## 主要功能





- **智能聊天界面**：用户友好的聊天界面，支持自然语言交互


- **加密货币检测**：自动识别用户提及的加密货币（如比特币、以太坊等）


- **实时价格图表**：显示不同时间框架（1天、1周、1月、3月、1年）的价格走势


- **响应式设计**：完美适配桌面、平板和移动设备


- **主题支持**：内置深色和浅色主题





## 技术栈





- **前端**：Next.js, React, TypeScript


- **样式**：内联样式（不依赖外部CSS框架）


- **图表**：Chart.js, react-chartjs-2


- **后端**：Next.js API Routes


- **AI集成**：Amazon Bedrock（用于生成回复）





## 安装与运行





### 前提条件





- Node.js 18.0.0 或更高版本


- npm 或 yarn





### 安装步骤





1. 克隆仓库


   ```bash


   git clone https://github.com/yourusername/web3-investment-advisor.git


   cd web3-investment-advisor


   ```





2. 安装依赖


   ```bash


   npm install


   # 或


   yarn install


   ```





3. 运行开发服务器


   ```bash


   npm run dev


   # 或


   yarn dev


   ```





4. 打开浏览器访问 http://localhost:3000





## 项目结构





```


src/


├── app/                  # Next.js 应用目录


│   ├── api/              # API 路由


│   │   ├── chat/         # 聊天API


│   │   └── crypto/       # 加密货币数据API


│   ├── globals.css       # 全局样式（未使用）


│   ├── layout.tsx        # 应用布局


│   └── page.tsx          # 主页面


├── components/           # React组件


│   ├── ChatInput.tsx     # 聊天输入组件


│   ├── ChatInterface.tsx # 主聊天界面


│   ├── ChatMessages.tsx  # 聊天消息显示


│   ├── CryptoChart.tsx   # 加密货币价格图表


│   └── Layout.tsx        # 布局组件（页眉和页脚）


├── lib/                  # 工具函数和库


│   ├── bedrock.ts        # Amazon Bedrock集成


│   └── utils.ts          # 通用工具函数


└── python/               # Python脚本


    └── bedrock_client.py # Bedrock客户端


```





## 使用指南





1. 在聊天框中输入关于加密货币的问题，例如：


   - "比特币是什么？"


   - "以太坊和比特币有什么区别？"


   - "现在投资Solana好吗？"





2. 系统会自动检测提到的加密货币，并在回复中显示相关价格图表





3. 您可以通过图表上方的按钮切换不同的时间框架（1D、1W、1M、3M、1Y）





## 自定义与配置





- **添加新的加密货币**：在`ChatInterface.tsx`中的`detectCryptocurrency`函数中添加新的加密货币关键词


- **修改图表颜色**：在`CryptoChart.tsx`中调整图表配置


- **调整UI主题**：直接在各组件中修改内联样式





## 贡献指南





1. Fork 这个仓库


2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)


3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)


4. 推送到分支 (`git push origin feature/amazing-feature`)


5. 开启一个 Pull Request





## 许可证





本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件





## 联系方式





如有任何问题或建议，请通过以下方式联系我：





- GitHub Issues: [https://github.com/yourusername/web3-investment-advisor/issues](https://github.com/yourusername/web3-investment-advisor/issues)


- Email: your.email@example.com





---





**注意**：本应用仅供教育和演示目的，不构成投资建议。投资加密货币存在风险，请在做出任何投资决定前进行充分的研究。
