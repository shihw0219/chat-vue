import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'hover.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/router/premission'
import 'animate.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { VueShowdownPlugin,showdown } from 'vue-showdown';

import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/github-dark.css'

// 按需引入语言支持
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import php from 'highlight.js/lib/languages/php'
import ruby from 'highlight.js/lib/languages/ruby'
import go from 'highlight.js/lib/languages/go'
import rust from 'highlight.js/lib/languages/rust'
import swift from 'highlight.js/lib/languages/swift'
import kotlin from 'highlight.js/lib/languages/kotlin'
import sql from 'highlight.js/lib/languages/sql'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import less from 'highlight.js/lib/languages/less'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import markdown from 'highlight.js/lib/languages/markdown'
import bash from 'highlight.js/lib/languages/bash'
import shell from 'highlight.js/lib/languages/shell'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import nginx from 'highlight.js/lib/languages/nginx'
import apache from 'highlight.js/lib/languages/apache'

// 代码高亮
showdown.extension('code-highlight', () => {
    return [
        {
            type: 'output',
            filter: function(text: string) {
                if (!text) return text
                // 匹配代码块
                const codeBlockRegex = /<pre><code\s*([^>]*)>([\s\S]*?)<\/code><\/pre>/gi
                const result = text.replace(codeBlockRegex, function(match, attributes, code) {
                    // 提取语言
                    let lang = 'plaintext'
                    const langMatch = attributes.match(/class="language-([^"]*)"/)
                    if (langMatch) {
                        lang = langMatch[1]
                    }
                    try {
                        // 解码 HTML 实体
                        const decodedCode = code
                            .replace(/&lt;/g, '<')
                            .replace(/&gt;/g, '>')
                            .replace(/&amp;/g, '&')
                            .replace(/&quot;/g, '"')
                            .replace(/&#39;/g, "'")

                        let highlighted
                        if (lang && lang !== 'plaintext' && hljs.getLanguage(lang)) {
                            highlighted = hljs.highlight(decodedCode, {
                                language: lang,
                                ignoreIllegals: true
                            }).value
                        } else {
                            const autoResult = hljs.highlightAuto(decodedCode)
                            highlighted = autoResult.value
                        }
                        return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`
                    } catch (err) {
                        return match // 出错时返回原内容
                    }
                })
                return result
            }
        }
    ]
})
const languages = [
    { name: 'javascript', module: javascript },
    { name: 'typescript', module: typescript },
    { name: 'python', module: python },
    { name: 'java', module: java },
    { name: 'cpp', module: cpp },
    { name: 'csharp', module: csharp },
    { name: 'php', module: php },
    { name: 'ruby', module: ruby },
    { name: 'go', module: go },
    { name: 'rust', module: rust },
    { name: 'swift', module: swift },
    { name: 'kotlin', module: kotlin },
    { name: 'sql', module: sql },
    { name: 'css', module: css },
    { name: 'scss', module: scss },
    { name: 'less', module: less },
    { name: 'html', module: xml },
    { name: 'xml', module: xml },
    { name: 'json', module: json },
    { name: 'yaml', module: yaml },
    { name: 'markdown', module: markdown },
    { name: 'bash', module: bash },
    { name: 'shell', module: shell },
    { name: 'dockerfile', module: dockerfile },
    { name: 'nginx', module: nginx },
    { name: 'apache', module: apache }
]
languages.forEach((language) => {
    hljs.registerLanguage(language.name, language.module)
});


const app = createApp(App)

app.use(VueShowdownPlugin, {
    flavor: 'github',
    options: {
        emoji: false,
    },
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')

