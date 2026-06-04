import type { Locale } from './content';

interface PrivacyItem {
  title: string;
  text: string;
}

interface PrivacyContent {
  intro: string;
  updated: string;
  items: PrivacyItem[];
}

const privacyContent: Partial<Record<Locale, PrivacyContent>> = {
  en: {
    intro: 'JSON Tools is designed to keep pasted JSON on your device. The tool pages do not require accounts or file uploads.',
    updated: 'Last updated: 2026-05-31',
    items: [
      { title: 'Tool input', text: 'JSON you paste into the formatter, validator, viewer, or minifier is processed locally in your browser.' },
      { title: 'No account required', text: 'The site does not require sign-up, login, or a personal profile to use the core tools.' },
      { title: 'Analytics and ads', text: 'The site may use analytics or advertising services to understand aggregate traffic and support maintenance.' },
      { title: 'External links', text: 'Links to app stores, related tools, or external resources follow the privacy policies of those services.' },
    ],
  },
  zh: {
    intro: 'JSON Tools 设计上尽量让你粘贴的 JSON 留在本机。工具页面不要求账号，也不要求上传文件。',
    updated: '最近更新：2026-05-31',
    items: [
      { title: '工具输入', text: '你粘贴到格式化、校验、查看或压缩工具里的 JSON，会在浏览器本地处理。' },
      { title: '无需账号', text: '核心工具不要求注册、登录或创建个人资料。' },
      { title: '分析与广告', text: '站点可能使用分析或广告服务，用于了解汇总访问情况并支持维护。' },
      { title: '外部链接', text: '访问 App Store、相关工具或外部资源时，适用对应服务自己的隐私政策。' },
    ],
  },
  ja: {
    intro: 'JSON Tools は、貼り付けた JSON をできるだけ端末内に留める設計です。ツールページではアカウントやファイルアップロードは不要です。',
    updated: '最終更新日: 2026-05-31',
    items: [
      { title: 'ツール入力', text: 'フォーマッター、検証、ビューア、圧縮ツールに貼り付けた JSON はブラウザー内で処理されます。' },
      { title: 'アカウント不要', text: '主要ツールは登録、ログイン、個人プロフィールなしで利用できます。' },
      { title: '分析と広告', text: '集計されたアクセス状況の把握と維持のため、分析または広告サービスを利用する場合があります。' },
      { title: '外部リンク', text: 'App Store、関連ツール、外部リソースでは、それぞれのサービスのプライバシーポリシーが適用されます。' },
    ],
  },
  ko: {
    intro: 'JSON Tools는 붙여넣은 JSON이 가능한 한 기기에 머물도록 설계되었습니다. 도구 페이지는 계정이나 파일 업로드를 요구하지 않습니다.',
    updated: '최근 업데이트: 2026-05-31',
    items: [
      { title: '도구 입력', text: '포맷, 검증, 보기, 압축 도구에 붙여넣은 JSON은 브라우저에서 로컬로 처리됩니다.' },
      { title: '계정 불필요', text: '핵심 도구는 가입, 로그인, 개인 프로필 없이 사용할 수 있습니다.' },
      { title: '분석 및 광고', text: '집계된 방문 현황을 이해하고 유지 관리를 지원하기 위해 분석 또는 광고 서비스를 사용할 수 있습니다.' },
      { title: '외부 링크', text: 'App Store, 관련 도구, 외부 리소스는 각 서비스의 개인정보 정책을 따릅니다.' },
    ],
  },
};

export function getPrivacyContent(locale: Locale): PrivacyContent {
  return privacyContent[locale] || privacyContent.en!;
}
