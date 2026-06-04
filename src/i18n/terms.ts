import type { Locale } from './content';

interface TermsItem {
  title: string;
  text: string;
}

interface TermsContent {
  intro: string;
  updated: string;
  items: TermsItem[];
}

const termsContent: Partial<Record<Locale, TermsContent>> = {
  en: {
    intro: 'JSON Tools provides general-purpose utilities and informational content for everyday productivity workflows. It does not constitute professional advice.',
    updated: 'Last updated: 2026-05-31',
    items: [
      {
        title: 'Provided as is',
        text: 'We work to keep tools stable and accurate, but results are not guaranteed for every business, legal, or production use case.',
      },
      {
        title: 'User responsibility',
        text: 'Please review tool results before publishing, submitting, or using them in important workflows.',
      },
      {
        title: 'Availability',
        text: 'The site may be temporarily unavailable because of maintenance, third-party services, or network issues.',
      },
      {
        title: 'Content updates',
        text: 'Tools, descriptions, links, and terms may change as the product evolves.',
      },
    ],
  },
  zh: {
    intro: 'JSON Tools 提供通用工具和信息内容，适合日常效率场景，不构成专业建议。',
    updated: '最近更新：2026-05-31',
    items: [
      {
        title: '按现状提供',
        text: '我们会尽力保持工具稳定准确，但不保证所有结果适合每一种业务或法律场景。',
      },
      {
        title: '用户责任',
        text: '请在提交、发布或商业使用前自行复核工具结果，尤其是重要文件和生产配置。',
      },
      {
        title: '可用性',
        text: '站点可能因维护、第三方服务或网络原因短暂不可用。',
      },
      {
        title: '内容更新',
        text: '工具、说明、链接和条款可能根据产品变化持续调整。',
      },
    ],
  },
  ja: {
    intro: 'JSON Tools は日常の効率化に役立つ汎用ツールと情報を提供します。専門的な助言ではありません。',
    updated: '最終更新日: 2026-05-31',
    items: [
      {
        title: '現状有姿',
        text: 'ツールの安定性と正確性に努めますが、すべての業務、法務、本番利用に適した結果を保証するものではありません。',
      },
      {
        title: '利用者の責任',
        text: '公開、提出、重要なワークフローで使用する前に、結果を必ず確認してください。',
      },
      {
        title: '可用性',
        text: 'メンテナンス、外部サービス、ネットワーク事情により一時的に利用できない場合があります。',
      },
      {
        title: '内容更新',
        text: 'ツール、説明、リンク、規約は製品の変化に応じて更新される場合があります。',
      },
    ],
  },
  ko: {
    intro: 'JSON Tools는 일상적인 생산성 작업을 위한 범용 도구와 정보를 제공합니다. 전문적인 조언은 아닙니다.',
    updated: '최근 업데이트: 2026-05-31',
    items: [
      {
        title: '있는 그대로 제공',
        text: '도구를 안정적이고 정확하게 유지하려고 노력하지만 모든 업무, 법률, 운영 환경에 적합한 결과를 보장하지는 않습니다.',
      },
      {
        title: '사용자 책임',
        text: '게시, 제출 또는 중요한 작업에 사용하기 전에 결과를 직접 확인해 주세요.',
      },
      {
        title: '가용성',
        text: '점검, 외부 서비스 또는 네트워크 문제로 사이트가 일시적으로 제공되지 않을 수 있습니다.',
      },
      {
        title: '내용 업데이트',
        text: '도구, 설명, 링크 및 약관은 제품 변화에 따라 계속 조정될 수 있습니다.',
      },
    ],
  },
};

export function getTermsContent(locale: Locale): TermsContent {
  return termsContent[locale] || termsContent.en!;
}
