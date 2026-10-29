export interface DimensionScores {
  prompting: number;     // 프롬프트 디렉팅력
  productivity: number;  // 워크플로우 생산성
  critical: number;      // 비판적 검증력
  toolStack: number;     // 툴 스택 확장성
}

export interface Option {
  id: string;
  label: string;
  text: string;
  description?: string;
  scores: DimensionScores;
}

export interface Question {
  id: number;
  category: string;
  hookTitle: string;
  situation: string;
  avatarSpeech: string;
  avatarMood: 'curious' | 'thinking' | 'surprised' | 'encouraging';
  options: Option[];
}

export interface ResultType {
  id: string;
  name: string;
  tagline: string;
  avatarType: 'director' | 'speedMaster' | 'inspector' | 'toolNomad' | 'conversationalist' | 'minimalist';
  badgeTitle: string;
  emoji: string;
  gradient: string;
  summaryQuote: string;
  traits: string[];
  strengths: string;
  caution: string;
  recommendations: string[];
  bestMatch: { name: string; reason: string };
  worstMatch: { name: string; reason: string };
  idealScores: DimensionScores;
}

export const DIMENSIONS = [
  {
    key: 'prompting' as const,
    name: '프롬프트 디렉팅력',
    shortName: '지시력',
    icon: '🎯',
    color: '#6366f1',
    description: 'AI에게 역할과 제약조건을 정교하게 설계해 고품질 결과물을 이끌어내는 힘',
  },
  {
    key: 'productivity' as const,
    name: '워크플로우 생산성',
    shortName: '칼퇴력',
    icon: '⚡',
    color: '#ec4899',
    description: '일상 업무 프로세스를 단축하고 불필요한 반복 작업을 없애는 시간 압축 기술',
  },
  {
    key: 'critical' as const,
    name: '비판적 검증력',
    shortName: '팩트체크',
    icon: '🛡️',
    color: '#0ea5e9',
    description: 'AI가 내뱉는 거짓말(할루시네이션)과 오류를 꿰뚫어 보고 걸러내는 필터링 능력',
  },
  {
    key: 'toolStack' as const,
    name: '툴 스택 확장성',
    shortName: '도구 확장',
    icon: '🚀',
    color: '#10b981',
    description: '텍스트에 머물지 않고 이미지, PDF, 데이터 분석, 최신 AI 툴을 엮어 쓰는 역량',
  },
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: '기획 & 초안 작성',
    hookTitle: '내 업무 속도, AI 덕분에 3배 빨라졌을까?',
    situation: '팀장님이 내일 아침까지 새 프로젝트 시장 조사 보고서의 "기획 초안"을 요구했다!',
    avatarSpeech: '시간이 촉박해! 넌 이 위기 상황에서 AI 창을 켜고 어떻게 첫 단추를 꿸 거야?',
    avatarMood: 'curious',
    options: [
      {
        id: '1-A',
        label: 'A',
        text: '목표, 타깃, 보고서 톤앤매너, 제외할 내용까지 5줄 이상 꼼꼼히 적어 초안 구조를 뽑는다.',
        scores: { prompting: 25, productivity: 15, critical: 15, toolStack: 10 },
      },
      {
        id: '1-B',
        label: 'B',
        text: '일단 "OO 시장 보고서 목차랑 핵심 내용 3줄 요약해줘" 치고, 3분 만에 나온 걸 빠르게 다듬는다.',
        scores: { prompting: 10, productivity: 25, critical: 10, toolStack: 10 },
      },
      {
        id: '1-C',
        label: 'C',
        text: 'AI가 써준 시장 수치나 출처를 의심하며, 구글 뉴스 및 공공 통계 사이트를 즉시 대조해 검증한다.',
        scores: { prompting: 15, productivity: 10, critical: 25, toolStack: 10 },
      },
      {
        id: '1-D',
        label: 'D',
        text: 'ChatGPT뿐 아니라 Perplexity 검색과 Gamma(PPT 생성) 툴까지 열어 슬라이드 초안까지 한 번에 만든다.',
        scores: { prompting: 15, productivity: 20, critical: 10, toolStack: 25 },
      },
    ],
  },
  {
    id: 2,
    category: '프롬프트 작성 스타일',
    hookTitle: '나는 AI를 비서로 부릴까, 검색창처럼 쓸까?',
    situation: '원하는 퀄리티의 답변이 한 번에 나오지 않고 다소 엉뚱한 대답이 돌아왔을 때, 나의 반응은?',
    avatarSpeech: 'AI가 말귀를 못 알아들었을 때, 평소 너의 진짜 대처법은 어때?',
    avatarMood: 'thinking',
    options: [
      {
        id: '2-A',
        label: 'A',
        text: '"너는 10년 차 마케팅 디렉터야. 방금 답변에서 전문 용어를 보강하고 예시를 2개 추가해"라고 재교정한다.',
        scores: { prompting: 25, productivity: 15, critical: 15, toolStack: 10 },
      },
      {
        id: '2-B',
        label: 'B',
        text: '대화 더 이어가기 귀찮아서 그냥 마음에 드는 핵심 문장 두 줄만 건져서 복붙하고 내가 직접 고친다.',
        scores: { prompting: 10, productivity: 25, critical: 15, toolStack: 10 },
      },
      {
        id: '2-C',
        label: 'C',
        text: '"혹시 제가 설명을 부족하게 했나요? 다른 관점에서는 어떻게 생각하세요?"라며 차근차근 상담하듯 묻는다.',
        scores: { prompting: 15, productivity: 10, critical: 10, toolStack: 15 },
      },
      {
        id: '2-D',
        label: 'D',
        text: '즉시 Claude나 Gemini 다른 모델 창으로 가서 동일한 질문을 넣어 결과물 차이를 비교해본다.',
        scores: { prompting: 15, productivity: 15, critical: 15, toolStack: 25 },
      },
    ],
  },
  {
    id: 3,
    category: '팩트체크 & 할루시네이션',
    hookTitle: 'AI가 내놓은 거짓말, 나는 몇 초 만에 알아챌까?',
    situation: 'AI가 작성해준 보고서 문장에 "2024년 한국생산성본부 조사에 따르면 87.4%가..."라는 그럴싸한 통계가 적혀있다.',
    avatarSpeech: '와, 진짜 전문가가 쓴 것 같지 않아? 이 문장을 보고 넌 어떻게 행동할 거야?',
    avatarMood: 'surprised',
    options: [
      {
        id: '3-A',
        label: 'A',
        text: '당장 조사 원문 PDF를 검색해 해당 숫자가 실제로 존재하는지, 왜곡된 맥락은 없는지 끝까지 파헤친다.',
        scores: { prompting: 10, productivity: 10, critical: 25, toolStack: 10 },
      },
      {
        id: '3-B',
        label: 'B',
        text: '문맥상 너무 그럴싸하고 자연스러우니 일단 보고서에 넣고, 마감 시간 지키는 걸 우선으로 삼는다.',
        scores: { prompting: 10, productivity: 25, critical: 5, toolStack: 10 },
      },
      {
        id: '3-C',
        label: 'C',
        text: 'AI에게 "방금 인용한 통계의 실제 출처 URL과 조사 제목을 제시해줘"라고 추가 질문해 확인한다.',
        scores: { prompting: 20, productivity: 15, critical: 20, toolStack: 10 },
      },
      {
        id: '3-D',
        label: 'D',
        text: '데이터 검증용 툴이나 논문 검색 AI(Consensus, Elicit 등)를 돌려서 학술/공식 근거를 즉각 매핑한다.',
        scores: { prompting: 15, productivity: 15, critical: 20, toolStack: 25 },
      },
    ],
  },
  {
    id: 4,
    category: '이메일 & 커뮤니케이션',
    hookTitle: '까다로운 거래처 메일, AI로 어떻게 해결할까?',
    situation: '무리한 요구를 해오는 거래처에 감정 상하지 않게 "정중하지만 단호한 거절 답장"을 보내야 한다.',
    avatarSpeech: '이거 잘못 쓰면 큰일 나는 메일이잖아! 너라면 AI를 어떻게 활용할래?',
    avatarMood: 'thinking',
    options: [
      {
        id: '4-A',
        label: 'A',
        text: '거래처와의 이전 히스토리와 사내 입장을 설명한 뒤, "공손한 쿠션어 + 대안 2개 포함" 조건을 걸어 작성시킨다.',
        scores: { prompting: 25, productivity: 15, critical: 15, toolStack: 10 },
      },
      {
        id: '4-B',
        label: 'B',
        text: '"거절 메일 정중하게 써줘" 치고, 1초 만에 나온 결과를 쓱 읽고 바로 전송 버튼을 누른다.',
        scores: { prompting: 10, productivity: 25, critical: 10, toolStack: 5 },
      },
      {
        id: '4-C',
        label: 'C',
        text: 'AI가 써준 메일을 읽으며 "혹시 상대방이 건방지게 느낄 단어는 없을까?" 세 번 정독하며 퇴고한다.',
        scores: { prompting: 15, productivity: 10, critical: 25, toolStack: 10 },
      },
      {
        id: '4-D',
        label: 'D',
        text: '생성된 답장을 톤 체인저 툴이나 문맥 감정 분석기로 한 번 더 필터링해 최적의 톤을 찾아낸다.',
        scores: { prompting: 15, productivity: 15, critical: 15, toolStack: 25 },
      },
    ],
  },
  {
    id: 5,
    category: '새로운 AI 도구 & 기술 수용',
    hookTitle: '‘AI 툴 유목민’인 나, 실전 무기는 몇 개나 될까?',
    situation: '유튜브와 사내 슬랙에 "노션 AI와 캔바 신기능으로 기획서 10배 빨리 만들기" 쇼츠 영상이 떴다!',
    avatarSpeech: '핫한 신상 AI 기능 소식을 들었을 때! 너의 손가락은 어디로 향하고 있어?',
    avatarMood: 'curious',
    options: [
      {
        id: '5-A',
        label: 'A',
        text: '바로 해당 서비스에 접속해 회원가입하고, 오늘 내 업무에 어떻게 연동할지 이것저것 테스트해본다.',
        scores: { prompting: 10, productivity: 15, critical: 10, toolStack: 25 },
      },
      {
        id: '5-B',
        label: 'B',
        text: '새로운 툴 배우는 데 시간 쓰기보다, 지금 손에 익은 기본 ChatGPT 하나로 칼퇴하는 게 최고다.',
        scores: { prompting: 15, productivity: 25, critical: 15, toolStack: 5 },
      },
      {
        id: '5-C',
        label: 'C',
        text: '툴의 화려한 껍데기보다, 내가 프롬프트 구조와 업무 지시 설계를 얼마나 잘하느냐가 본질이라고 믿는다.',
        scores: { prompting: 25, productivity: 20, critical: 15, toolStack: 10 },
      },
      {
        id: '5-D',
        label: 'D',
        text: '"회사 정보나 개인 데이터가 저 외부 툴 서버에 저장되는 건 아닌가?" 약관과 보안 정책부터 확인한다.',
        scores: { prompting: 10, productivity: 10, critical: 25, toolStack: 15 },
      },
    ],
  },
  {
    id: 6,
    category: '데이터 분석 & 엑셀/정리',
    hookTitle: '복잡한 숫자와 긴 보고서, 어떻게 요리할까?',
    situation: '100페이지짜리 정부 정책 자료와 방대한 엑셀 데이터를 분석해 팀장님 보고용 핵심 인사이트를 뽑아야 한다.',
    avatarSpeech: '우와... 텍스트랑 숫자 폭탄이다! 이 방대한 자료를 마주한 너의 치트키는?',
    avatarMood: 'surprised',
    options: [
      {
        id: '6-A',
        label: 'A',
        text: 'PDF/엑셀 파일을 AI에 업로드하고 "이상치(Outlier) 3개와 전년 대비 성장률을 표로 추출해줘"라고 명령한다.',
        scores: { prompting: 20, productivity: 20, critical: 15, toolStack: 25 },
      },
      {
        id: '6-B',
        label: 'B',
        text: '단락별로 잘라 넣으며 "이거 3줄 요약"만 연타로 날려 대략적인 줄거리만 10분 안에 챙긴다.',
        scores: { prompting: 10, productivity: 25, critical: 10, toolStack: 10 },
      },
      {
        id: '6-C',
        label: 'C',
        text: 'AI가 뽑아준 통계표를 내 눈으로 엑셀 원본 셀과 하나하나 대조하며 계산 오류가 없는지 검수한다.',
        scores: { prompting: 15, productivity: 10, critical: 25, toolStack: 10 },
      },
      {
        id: '6-D',
        label: 'D',
        text: '분석 프롬프트에 분석 관점(SWOT, PESTEL 등) 프레임워크를 명시하고 전략적 시사점까지 도출하게 설계한다.',
        scores: { prompting: 25, productivity: 15, critical: 15, toolStack: 15 },
      },
    ],
  },
  {
    id: 7,
    category: '브레인스토밍 & 아이디어',
    hookTitle: '아이디어가 꽉 막혔을 때, AI와 어떻게 대화할까?',
    situation: '신규 이벤트 프로모션 아이디어가 도무지 떠오르지 않아 머리를 쥐어뜯고 있는 오후 3시!',
    avatarSpeech: '머리가 새하얗게 굳었어... 이럴 때 AI랑 어떻게 대화 나누는 편이야?',
    avatarMood: 'thinking',
    options: [
      {
        id: '7-A',
        label: 'A',
        text: '"지금부터 넌 20대 트렌드 세터야. 최근 Z세대가 열광하는 밈과 키워드를 반영한 아이디어 20개 내놔"라고 롤플레잉을 시킨다.',
        scores: { prompting: 25, productivity: 15, critical: 10, toolStack: 15 },
      },
      {
        id: '7-B',
        label: 'B',
        text: '"이벤트 아이디어 10개만 추천해줘" 툭 던지고, 그중 괜찮은 거 하나 골라 빠르게 보고서에 올린다.',
        scores: { prompting: 10, productivity: 25, critical: 10, toolStack: 10 },
      },
      {
        id: '7-C',
        label: 'C',
        text: '"요즘 너무 막막한데, 이런 기획할 때 너라면 어떤 콘셉트로 풀 것 같아?" 편하게 수다 떨듯 생각을 확장한다.',
        scores: { prompting: 15, productivity: 15, critical: 10, toolStack: 15 },
      },
      {
        id: '7-D',
        label: 'D',
        text: '텍스트 아이디어를 뽑자마자 이미지 생성 AI(Midjourney 등)로 시각 콘셉트 무드보드까지 순식간에 제작한다.',
        scores: { prompting: 15, productivity: 15, critical: 10, toolStack: 25 },
      },
    ],
  },
  {
    id: 8,
    category: 'AI와 나의 미래 경쟁력',
    hookTitle: 'AI 시대에 나는 어떤 사람으로 살아남을까?',
    situation: '회사에서 "앞으로 모든 직원은 업무에 생성형 AI를 필수 활용하여 업무 효율을 증명하라"는 공지가 내려왔다.',
    avatarSpeech: '마지막 질문이야! AI가 일상이 된 미래의 업무 환경, 너의 자신 있는 포지션은 뭐야?',
    avatarMood: 'encouraging',
    options: [
      {
        id: '8-A',
        label: 'A',
        text: '누구보다 정확하고 강력한 프롬프트로 AI를 부하직원처럼 조련하는 "마스터 디렉터"가 될 것이다.',
        scores: { prompting: 25, productivity: 15, critical: 15, toolStack: 10 },
      },
      {
        id: '8-B',
        label: 'B',
        text: '남들 야근할 때 자동화와 AI 치트키로 6시 땡 정시 퇴근을 매일 사수하는 "칼퇴의 달인"이 될 것이다.',
        scores: { prompting: 10, productivity: 25, critical: 10, toolStack: 10 },
      },
      {
        id: '8-C',
        label: 'C',
        text: 'AI가 쏟아내는 정보의 참과 거짓을 완벽히 분별하여 조직의 리스크를 막는 "최종 의사결정자"가 될 것이다.',
        scores: { prompting: 15, productivity: 10, critical: 25, toolStack: 10 },
      },
      {
        id: '8-D',
        label: 'D',
        text: '새로 나오는 첨단 AI 툴들을 가장 먼저 마스터해 팀의 업무 혁신을 이끄는 "테크 리더"가 될 것이다.',
        scores: { prompting: 15, productivity: 15, critical: 10, toolStack: 25 },
      },
    ],
  },
];

export const RESULT_TYPES: Record<string, ResultType> = {
  director: {
    id: 'director',
    name: 'AI 부사수 쥐잡듯이 잡는 ‘깐깐한 총괄 디렉터’',
    tagline: '배경 설명부터 말투, 제약조건까지 다 정해줘야 직성이 풀리는 프로 지시러',
    avatarType: 'director',
    badgeTitle: '지휘봉 잡은 마에스트로',
    emoji: '🎩',
    gradient: 'from-indigo-600 via-indigo-700 to-purple-800',
    summaryQuote: '“AI는 시키는 사람의 역량만큼 일한다. 모호한 지시는 모호한 재앙을 낳을 뿐!”',
    traits: [
      '프롬프트 창에 엔터 치기 전, 이미 서너 문단에 달하는 상세 가이드라인과 롤(Role)을 부여함',
      '마음에 안 드는 결과가 나오면 “다시 해” 대신 구체적인 수정 가이드라인을 칼같이 지시함',
      '사내에서 ‘AI로 기획서 초안 제일 잘 뽑아오는 사람’으로 은근히 소문나 있음',
    ],
    strengths: 'AI에게 일을 맡기는 기술(디렉팅력)이 탁월해 재작업 빈도가 적고, 결과물의 완성도와 일관성이 업계 최고 수준입니다.',
    caution: '프롬프트 작성에 너무 많은 정성과 시간을 쏟아붓다 보면, “그냥 내가 직접 쓰는 게 더 빠르지 않았을까?” 하는 현타가 올 수 있습니다.',
    recommendations: [
      '자주 쓰는 복잡한 프롬프트는 템플릿(나만의 메모장/스니펫)으로 저장해 재사용 시간을 아끼세요.',
      '단순한 이메일이나 문장 교정 같은 가벼운 과업은 힘을 빼고 1~2문장 단답으로 시켜보세요.',
      '팀원들에게 나만의 고효율 프롬프트 구조(맥락-목표-제약-형식)를 공유해 사내 전도사가 되어보세요.',
    ],
    bestMatch: {
      name: '3초 만에 복붙하고 사라지는 ‘칼퇴의 지배자’',
      reason: '내가 정교하게 깎아놓은 프롬프트 템플릿을 칼퇴러가 신나게 써먹으며 최고의 윈윈을 만듭니다.',
    },
    worstMatch: {
      name: '자판기처럼 딱 필요한 것만 뽑아먹는 ‘미니멀리스트’',
      reason: '단답형으로 대충 던지는 모습을 보면 나도 모르게 잔소리가 폭발할 수 있습니다.',
    },
    idealScores: { prompting: 92, productivity: 75, critical: 78, toolStack: 70 },
  },
  speedMaster: {
    id: 'speedMaster',
    name: '3초 만에 복붙하고 사라지는 ‘칼퇴의 지배자’',
    tagline: '인간의 노동은 최소화하고 퇴근 시간은 최대화하는 실속형 스피드 레이서',
    avatarType: 'speedMaster',
    badgeTitle: '6시 00초 칼퇴의 신',
    emoji: '⚡',
    gradient: 'from-amber-500 via-rose-600 to-pink-700',
    summaryQuote: '“야근은 죄악이다. AI를 쓰는 유일한 이유는 내 저녁이 있는 삶을 위해서다!”',
    traits: [
      '긴 이메일이나 30페이지 보고서가 오면 읽기 전에 일단 AI 창에 던져놓고 “세 줄 요약”부터 누름',
      '엑셀 수식, 회의록 정리, 영문 답장은 무조건 AI의 손을 거쳐 5분 컷으로 끝냄',
      '팀장님이 “벌써 다 했어?”라고 물어볼 때 속으로 조용히 승리의 미소를 지음',
    ],
    strengths: '업무의 병목 구간을 빠르게 해소하고 시간을 극한으로 단축시키는 실전 생산성 감각이 동물적으로 뛰어납니다.',
    caution: 'AI가 지어낸 가짜 데이터나 어색한 번역투 문장을 팩트체크 없이 그대로 보고서에 복붙했다가 아찔한 상황을 겪을 수 있습니다.',
    recommendations: [
      '복붙 후 팀장님/거래처에 전송하기 전 딱 ‘30초 크로스체크(숫자, 고유명사 확인)’ 습관을 들이세요.',
      '“앞서 말한 내용 중 확실한 출처나 근거가 부족한 부분은 어디야?”라고 AI에게 되묻는 습관을 가져보세요.',
      '절약된 소중한 시간에 단순 휴식뿐 아니라 핵심 아이디어 기획에 조금 더 투자해보세요.',
    ],
    bestMatch: {
      name: 'AI 말은 콩으로 메주를 쑨대도 안 믿는 ‘의심암귀 감찰관’',
      reason: '내가 초스피드로 뽑아온 결과물을 감찰관 동료가 꼼꼼히 검증해주면 무적의 듀오가 됩니다.',
    },
    worstMatch: {
      name: '신상 툴만 보면 일단 가입부터 하는 ‘장비빨 툴 유목민’',
      reason: '툴 세팅하느라 퇴근 늦어지는 모습을 보면 답답해서 가슴을 치게 됩니다.',
    },
    idealScores: { prompting: 65, productivity: 95, critical: 58, toolStack: 68 },
  },
  inspector: {
    id: 'inspector',
    name: 'AI 말은 콩으로 메주를 쑨대도 안 믿는 ‘의심암귀 감찰관’',
    tagline: 'AI의 할루시네이션(거짓말)을 귀신같이 잡아내는 인간 필터링 머신',
    avatarType: 'inspector',
    badgeTitle: '할루시네이션 저승사자',
    emoji: '🔍',
    gradient: 'from-cyan-600 via-sky-700 to-blue-800',
    summaryQuote: '“AI가 그럴싸하게 거짓말하는 걸 내 눈으로 본 이상, 한 줄도 그냥 넘어갈 수 없다.”',
    traits: [
      'AI가 알려준 법 조항, 시장 통계, 수치를 보면 무조건 구글이나 사내 원본 문서를 켜서 교차 검증함',
      '“이 답변의 출처 링크와 계산 과정을 단계별로 소명해”라며 AI를 취조하듯 다룸',
      '사내 보고서나 대외 자료에서 치명적인 오탈자나 수치 오류를 낸 적이 한 번도 없음',
    ],
    strengths: '데이터 신뢰도와 리스크 관리가 완벽하여, 어떤 깐깐한 상사 앞에서도 당당할 수 있는 탄탄한 결과물을 만듭니다.',
    caution: 'AI를 너무 불신한 나머지 검증 작업에 과도한 에너지를 써서, AI를 쓰는 원래 목적인 ‘업무 속도 단축’의 맛을 잘 못 느낄 수 있습니다.',
    recommendations: [
      '사실 검증이 필요한 작업에는 검색 기능이 특화된 검색 연동형 AI(퍼플렉시티 등)를 병행해 검증 피로도를 낮추세요.',
      '기획 브레인스토밍처럼 ‘정답이 없는 창의적 작업’에는 의심을 내려놓고 AI와 자유롭게 놀아보세요.',
      '본인의 탁월한 팩트체크 기준을 ‘사내 AI 활용 체크리스트’로 문서화해보세요.',
    ],
    bestMatch: {
      name: '3초 만에 복붙하고 사라지는 ‘칼퇴의 지배자’',
      reason: '칼퇴러의 초스피드 실행력과 내 철저한 안전벨트가 결합하면 완벽한 시너지를 발휘합니다.',
    },
    worstMatch: {
      name: 'AI에게도 깍듯하게 인사하는 ‘과몰입 소통러’',
      reason: 'AI와 잡담 나누며 시간 보내는 걸 보면 당장 팩트체크부터 시키고 싶어집니다.',
    },
    idealScores: { prompting: 72, productivity: 60, critical: 96, toolStack: 65 },
  },
  toolNomad: {
    id: 'toolNomad',
    name: '신상 툴만 보면 일단 가입부터 하는 ‘장비빨 툴 유목민’',
    tagline: 'PPT, 코딩, 이미지, 음악 생성까지 계정만 10개 넘는 최신 트렌드 수집가',
    avatarType: 'toolNomad',
    badgeTitle: 'AI 트렌드 안테나',
    emoji: '🚀',
    gradient: 'from-emerald-600 via-teal-700 to-cyan-800',
    summaryQuote: '“좋은 연장이 명품을 만든다. 새로운 AI 툴이 나왔는데 어떻게 안 써봐?”',
    traits: [
      'SNS에 “업무 효율 10배 올려주는 신규 AI 툴” 영상이 뜨면 바로 북마크하고 회원가입함',
      '발표 자료를 만들 때도 ChatGPT 외에 Gamma, Midjourney, Claude 등 다양한 도구를 화면에 띄워놓음',
      '동료들이 “요즘 무슨 AI 써야 해?”라고 물어보면 신나서 도구별 장단점을 10분 동안 브리핑해줌',
    ],
    strengths: '새로운 기술과 멀티모달(텍스트, 이미지, 오디오) 생태계에 대한 적응력이 빠르고 기술 습득에 두려움이 전혀 없습니다.',
    caution: '도구 쇼핑과 세팅에 너무 많은 시간을 뺏겨, 정작 오늘 퇴근 전까지 끝내야 할 진짜 메인 업무 마감이 늦어질 수 있습니다.',
    recommendations: [
      '가입한 수많은 도구 중 본인의 주간 고정 업무에 진짜 기여하는 ‘핵심 툴 Top 2’만 남기고 다이어트해보세요.',
      '도구를 테스트하는 시간과 실제 업무를 실행하는 시간을 명확히 타이머로 분리하세요.',
      '다양한 툴을 연결해주는 자동화 도구(Zapier, Make 등)를 가볍게 엮어 진정한 올인원 파이프라인을 구축해보세요.',
    ],
    bestMatch: {
      name: 'AI 부사수 쥐잡듯이 잡는 ‘깐깐한 총괄 디렉터’',
      reason: '내가 발굴해온 최신 도구에 디렉터의 정교한 프롬프트가 더해지면 타의 추종을 불허합니다.',
    },
    worstMatch: {
      name: '자판기처럼 딱 필요한 것만 뽑아먹는 ‘미니멀리스트’',
      reason: '아무리 좋은 신상 툴을 소개해줘도 "그냥 ChatGPT 무료로도 충분해"라며 거절당합니다.',
    },
    idealScores: { prompting: 74, productivity: 72, critical: 64, toolStack: 95 },
  },
  conversationalist: {
    id: 'conversationalist',
    name: 'AI에게도 깍듯하게 인사하는 ‘과몰입 소통러’',
    tagline: '아이디어 막힐 때마다 AI를 소회의실로 불러내 1:1 티타임 갖는 브레인스토머',
    avatarType: 'conversationalist',
    badgeTitle: 'AI 영혼의 단짝',
    emoji: '☕',
    gradient: 'from-pink-500 via-rose-600 to-purple-700',
    summaryQuote: '“고마워, 수고했어 한마디가 AI도 춤추게 한다. 대화 속에서 진짜 아이디어가 피어나지!”',
    traits: [
      '프롬프트에 무의식적으로 “안녕하세요”, “혹시 바쁘지 않으시다면…”, “정말 감사해요!”를 붙임',
      '업무 지시뿐 아니라 “이 프로젝트 어떻게 생각해?”, “요즘 이런 트렌드는 왜 그럴까?” 같은 대화형 티키타카를 즐김',
      '사수가 바빠서 질문하기 눈치 보일 때, 가장 든든하고 친절한 사수 역할을 AI에게 맡김',
    ],
    strengths: '막막한 백지 상태에서 기획 방향을 발산하고, 다양한 관점의 아이디어를 다각도로 끌어내는 확산적 사고에 매우 능합니다.',
    caution: 'AI와 즐겁게 대화는 많이 나눴는데, 대화창을 닫고 나면 “그래서 당장 결재판에 올릴 구체적인 문서는 어디 있지?” 상태가 되기 쉽습니다.',
    recommendations: [
      '대화가 무르익었을 때 반드시 “지금까지 나눈 대화를 바탕으로, 보고용 1페이지 개요표(표 형식)로 요약 정리해줘”라고 마무리 지시를 내리세요.',
      '인사말이나 수식어는 과감히 생략해도 AI의 답변 퀄리티에는 영향이 없으니 문장을 간결하게 압축해보세요.',
      'AI에게 비판적인 악마의 변호인(Devil\'s Advocate) 역할을 맡겨, 내 아이디어의 맹점을 공격해보라고 시켜보세요.',
    ],
    bestMatch: {
      name: '신상 툴만 보면 일단 가입부터 하는 ‘장비빨 툴 유목민’',
      reason: '새로운 툴로 신선한 대화를 나누며 끝없는 아이디어 꽃을 피울 수 있습니다.',
    },
    worstMatch: {
      name: 'AI 말은 콩으로 메주를 쑨대도 안 믿는 ‘의심암귀 감찰관’',
      reason: '내가 열심히 꺼내온 감성적인 아이디어를 차가운 팩트의 잣대로 난도질당할 수 있습니다.',
    },
    idealScores: { prompting: 80, productivity: 62, critical: 65, toolStack: 78 },
  },
  minimalist: {
    id: 'minimalist',
    name: '자판기처럼 딱 필요한 것만 뽑아먹는 ‘미니멀리스트 실속파’',
    tagline: '프롬프트 기교 따윈 필요 없고, 오직 단답형 질문으로 본전 확실히 챙기는 담백러',
    avatarType: 'minimalist',
    badgeTitle: '알짜배기 가성비 장인',
    emoji: '🎯',
    gradient: 'from-slate-700 via-gray-800 to-zinc-900',
    summaryQuote: '“도구는 도구일 뿐. 거창한 수식어 없이 본론만 던져도 내 할 일은 끝난다.”',
    traits: [
      '어려운 역할 지정이나 긴 문맥 설명 없이 “오탈자 교정해줘”, “공손한 거절 메일 써줘”처럼 본론만 던짐',
      '유료 결제나 복잡한 신상 툴 공부에는 관심 없고, 기본 무료 버전으로도 업무 스트레스를 80% 줄임',
      'AI를 거창한 혁신 도구가 아니라 ‘성능 좋은 계산기나 사전’처럼 쿨하고 실용적으로 대함',
    ],
    strengths: '툴에 휘둘리거나 에너지를 낭비하지 않으며, 투자 시간 대비 가장 높은 효율(가성비)을 일상에서 실현합니다.',
    caution: '늘 쓰던 기본 패턴으로만 쓰다 보니, 복잡한 데이터 분석이나 심층 보고서 기획 등 고난도 과업에는 AI의 잠재력을 절반도 활용하지 못할 수 있습니다.',
    recommendations: [
      '평소 던지던 단답형 질문 뒤에 “~한 입장에서”, “표 형식으로” 같은 1줄 조건만 딱 추가해보세요.',
      '긴 텍스트 파일(PDF, 엑셀)을 직접 업로드해 통째로 분석시키는 기능을 딱 한 번만 시도해보세요.',
      '단순 문장 교정을 넘어, 경쟁사 자료 비교나 기획 논리 점검 같은 한 단계 높은 과업을 한 번 테스트해보세요.',
    ],
    bestMatch: {
      name: 'AI 부사수 쥐잡듯이 잡는 ‘깐깐한 총괄 디렉터’',
      reason: '디렉터가 만들어둔 표준 프롬프트 1개를 공유받아 1초 만에 알뜰하게 써먹습니다.',
    },
    worstMatch: {
      name: '신상 툴만 보면 일단 가입부터 하는 ‘장비빨 툴 유목민’',
      reason: '매일 새로운 툴 쓰라고 권유받을 때마다 귀찮아서 도망치고 싶어집니다.',
    },
    idealScores: { prompting: 62, productivity: 82, critical: 68, toolStack: 52 },
  },
};
