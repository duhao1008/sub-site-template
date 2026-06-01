import type { Locale } from './content';

export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: Record<Locale, FaqItem[]> = {
  en: [
    {
      q: 'Does this site upload my input?',
      a: 'No. Tool processing is designed to run locally in the browser whenever possible.',
    },
    {
      q: 'Do I need an account?',
      a: 'No. The tools are available without login.',
    },
    {
      q: 'Can I customize these FAQ items for a copied sub-site?',
      a: 'Yes. Edit src/i18n/faqs.ts and update the questions and answers for each language.',
    },
  ],
  zh: [
    {
      q: '这个网站会上传我的输入内容吗？',
      a: '不会。工具处理尽量在浏览器本地完成。',
    },
    {
      q: '需要注册账号吗？',
      a: '不需要。工具可以直接使用。',
    },
    {
      q: '复制成新子站后可以改这些常见问题吗？',
      a: '可以。只需要修改 src/i18n/faqs.ts 中对应语言的问题和答案。',
    },
  ],
  ja: [
    {
      q: '入力内容はアップロードされますか？',
      a: 'いいえ。ツール処理は可能な限りブラウザ内でローカルに実行されます。',
    },
    {
      q: 'アカウントは必要ですか？',
      a: 'いいえ。ログインなしで利用できます。',
    },
    {
      q: 'コピーした子サイトで FAQ を変更できますか？',
      a: 'はい。src/i18n/faqs.ts の各言語の質問と回答を編集してください。',
    },
  ],
  ko: [
    {
      q: '입력한 내용이 업로드되나요?',
      a: '아니요. 도구 처리는 가능한 한 브라우저에서 로컬로 실행되도록 설계되어 있습니다.',
    },
    {
      q: '계정이 필요한가요?',
      a: '아니요. 로그인 없이 사용할 수 있습니다.',
    },
    {
      q: '복사한 하위 사이트에서 FAQ를 수정할 수 있나요?',
      a: '네. src/i18n/faqs.ts에서 각 언어의 질문과 답변을 수정하면 됩니다.',
    },
  ],
};

export function getFaqItems(locale: Locale) {
  return faqItems[locale] || faqItems.en;
}
