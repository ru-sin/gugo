'use client';
import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Code, Globe, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  // 1. 初始值统一设为 false（服务端渲染固定值）
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2. 客户端挂载后，从 localStorage 读取真实值（避免水合不一致）
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const initialDark = saved ? JSON.parse(saved) : false;
    setDarkMode(initialDark);
    document.documentElement.classList.toggle('dark', initialDark);
  }, []);

  // 3. 切换逻辑：同步状态 + DOM + 本地存储
  const toggleDark = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // 4. 关键：客户端挂载完成后再渲染动态类名（彻底解决水合不匹配）
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 动态类名计算
  const mainClasses = isMounted 
    ? `min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}` 
    : 'min-h-screen transition-colors duration-300 bg-white'; // 服务端初始固定类名
  return (
    <main className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <style>{`
        @font-face {
          font-family: "霞鹜文楷";
          font-display: swap;
          src: url("https://rusin.qzz.io/ttf/霞鹜文楷.ttf") format("truetype");
        }
        * {
          font-family: "霞鹜文楷" !important;
        }
        .katex-block * {
          font-family: "KaTeX_Main" !important;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dark * {
          color: #dde1e8f0 !important;
        }
        .dark .text-blue-600 {
          color: #5c31ea !important;
        }
        .dark .text-green-600 {
          color: #4ade80 !important;
        }
        .dark .text-gray-500, .dark .text-gray-600 {
          color: #d1d5db !important;
        }
        .dark .bg-white {
          background-color: #1f2937 !important;
        }
        .dark .text-red-600 {
          color: #f87171 !important;
        }
        .dark .text-other-gray {
          color: #323436 !important;
        }
      `}</style>

      {/* 右上角按钮 */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleDark}
          className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-gray-800 dark:text-gray-200"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-gray-800 dark:text-gray-200"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-6 text-lg">
          <div><a href="https://docs.rusin.qzz.io/gugo" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">文档</a></div>
          <a href="https://docs.rusin.qzz.io/gugo/join" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">加入</a>
          <div><a href="https://blog.rusin.qzz.io" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">博客</a></div>
        </div>
      )}

      {/* 导航 */}
      <nav className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">咕链</div>
        <div className="hidden md:flex gap-6 text-sm">
          <div><a href="https://docs.rusin.qzz.io/gugo" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">文档</a></div>
          <a href="https://docs.rusin.qzz.io/gugo/join" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">加入</a>
          <div><a href="https://blog.rusin.qzz.io" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">博客</a></div>
        </div>
        <a href="https://docs.rusin.qzz.io/gugo/join" className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">立即开始</a>
      </nav>

      {/* Hero */}
      <section className={`py-20 ${darkMode 
        ? 'bg-gradient-to-b from-gray-900 to-gray-700' 
        : 'bg-gradient-to-b from-blue-0 to-blue-400'}`}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white" style={{ animation: 'fadeInUp 0.7s forwards' }}>
            加入咕链<br /><b>即刻</b>改变
          </h1>
          <p className="text-lg text-gray-900 dark:text-gray-300 max-w-xl mx-auto mb-10" style={{ animation: 'fadeInUp 0.7s 0.2s forwards', opacity: 0 }}>
            在来来往往的文章中找到你。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4" style={{ animation: 'fadeInUp 0.7s 0.4s forwards', opacity: 0 }}>
            <a href="#" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2">
              免费开始 <ArrowRight size={17} />
            </a>
            <a href="#" className="border border-gray-300 dark:border-gray-700 px-8 py-3 rounded-lg text-white dark:text-gray-300">
              查看演示
            </a>
          </div>
        </div>
      </section>

      {/* 核心能力 */}
      <section className={`py-20 ${darkMode 
        ? 'bg-gradient-to-b from-gray-700 to-gray-400' 
        : 'bg-gradient-to-b from-blue-400 to-blue-600'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">核心能力</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { icon: <Code />, title: "智能构建引擎", desc: "自动识别项目框架，一键编译打包，零配置部署。" },
            { icon: <Globe />, title: "全球节点加速", desc: "覆盖国内主流地区，智能路由，访问速度大幅提升。" },
            { icon: <Shield />, title: "安全与合规", desc: "DDoS 防护、访问加密、权限控制，企业级安全保障。" },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl border ${darkMode 
                ? 'bg-gray-800/50 border-gray-700 backdrop-blur' 
                : 'bg-white/80 border-gray-200 backdrop-blur'}`}
              style={{ animation: `fadeInUp 0.7s ${0.5 + i * 0.2}s forwards`, opacity: 0 }}
            >
              <div className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 对比 */}
      <section className={`py-20 ${darkMode 
        ? 'bg-gradient-to-b from-gray-400 to-gray-200' 
        : 'bg-gradient-to-b from-blue-600 to-blue-800'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-other-gray">访问人数先后对比</h2>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <div className={`rounded-xl border ${darkMode 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/90 border-gray-200'}`}>
            <table className="w-full text-sm">
              <thead className={darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-600'}>
                <tr><th className="text-left p-4">分类</th><th className="text-left p-0">加入咕链</th><th className="text-left p-0">未加入咕链</th></tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                <tr><td className="p-4">剪贴板</td><td className="text-green-600 dark:text-green-400">5人/天</td><td className="text-red-600 dark:text-red-600">2人/天</td></tr>
                <tr><td className="p-4">专栏</td><td className="text-green-600 dark:text-green-400">9人/天</td><td className="text-red-600 dark:text-red-600">3人/天</td></tr>
                <tr><td className="p-4">主页</td><td className="text-green-600 dark:text-green-400">7人/天</td><td className="text-red-600 dark:text-red-600">3人/天</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-24 ${darkMode 
        ? 'bg-gradient-to-r from-blue-900 to-indigo-800' 
        : 'bg-gradient-to-r from-blue-600 to-indigo-400'} text-white`}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">立即开启<b>咕链接力之旅</b></h2>
          <p className="mb-10">无需登录，免费开启咕链接力之旅</p>
            <a href="https://docs.rusin.qzz.io/gugo/join" className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2">
              免费开始 <ArrowRight size={16} />
            </a>
        </div>
      </section>

      {/* 页脚 */}
      <footer className={`py-12 border-t ${darkMode 
        ? 'bg-gradient-to-br from-border-grey-200 via-indigo-300 to-gray-600' 
        : 'bg-gradient-to-r from-blue-200 via-blue-300 to-blue-600'}`}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">咕链</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">在来来往往的文章中找到你。</p>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-gray-900 dark:text-white">产品</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#">核心功能</a></li>
              <li><a href="#">全球节点</a></li>
              <li><a href="#">安全防护</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-gray-900 dark:text-white">资源</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#">开发文档</a></li>
              <li><a href="#">API 参考</a></li>
              <li><a href="#">帮助中心</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-gray-900 dark:text-white">关于我们</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#">公司介绍</a></li>
              <li><a href="#">联系我们</a></li>
              <li><a href="#">隐私政策</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 text-center text-xs text-gray-500 dark:text-gray-600">
          © 2026-Present 咕链. All rights reserved.
        </div>
      </footer>
    </main>
  );
}