# 🍶 soolsool (술술) - Project Root Guide

> 술을 사랑하는 사람들을 위한 개인 음주 기록, 평점 관리 및 소셜 공유 플랫폼.
> "내가 마신 술을 기록하고, 서로의 술 달력을 슬쩍 들여다보는 즐거움"

---

## 1. 서비스 정의 및 비전 (Service Overview)
* **한 줄 정의:** 주종별 개인 커스텀 테이스팅 노트 + 달력 기반 음주 다이어리 + 소셜 공유 서비스
* **핵심 가치:** 
  1. **기록의 파편화 방지:** 위스키, 와인, 전통주 등 흩어져 있는 시음 기록을 한곳에 아카이빙.
  2. **시각적 즐거움:** 달력을 통해 나의 음주 패턴과 빈도를 직관적으로 확인.
  3. **연결성:** 친구의 술 달력과 위시리스트를 확인하며 새로운 술을 추천받는 재미.
* **확장 가능성:** 향후 주종별 상세 가이드(도수, 양조장, 아로마 휠), AI 기반 맞춤형 술 추천, 전통주 커머스 연계로 확장 고려.

---

## 2. 핵심 화면 구성 (Required Screens)

### 1) 메인 피드 및 홈 (Home / Feed)
* 팔로우한 친구들의 최신 술 리뷰 및 평점 피드 노출.
* 오늘 가장 핫한 술 트렌드 또는 유저 추천 리스트.

### 2) 술 달력 (Sool-Calendar)
* 월별 달력 UI 기반으로 음주한 날에 마신 술 아이콘/라벨 표시.
* 특정 날짜 클릭 시 해당 날짜의 상세 음주 기록(술 종류, 같이 먹은 안주, 누구랑 마셨는지, 간단 평점) 팝업/페이지 연결.

### 3) 개인 대시보드 및 마이페이지 (My Page)
* **평점 리스트:** 내가 매긴 평점 순(5성 가득한 인생 술 리스트 등) 필터링 및 정렬 기능.
* **위시리스트 (Wish List):** 먹어보고 싶은 술을 저장해 두고, 마신 뒤 클릭 한 번으로 리뷰 작성 화면으로 전환 가능한 공간.
* 나의 음주 통계 (이번 달 가장 많이 마신 주종 등 - 확장용).

### 4) 술 상세 및 시음 노트 등록 (Detail & Review Form)
* 술 검색 및 기본 정보 확인 화면.
* 테이스팅 노트 등록: 별점, 한 줄 평, 아로마 휠 선택(바디감, 단맛, 신맛 등), 사진 업로드.

---

## 3. 기술 스택 및 라이브러리 (Tech Stack)

### Core
* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + shadcn/ui (Radix UI 기반의 헤드리스 컴포넌트)

### State Management & Data Fetching
* **Server State:** TanStack Query v5 (React Query) - 서버 데이터 페칭 및 캐싱 최적화
* **Client State:** Zustand - 달력 모달 상태, 위시리스트 토글 등 가벼운 전역 상태 관리

### Database & Auth (초기 MVP 기준 제안)
* **Backend/DB:** Supabase (PostgreSQL 기반, 빠른 API 생성 및 실시간 기능 지원)
* **Auth:** Supabase Auth (소셜 로그인 - 카카오, 구글 확장 용이)

---

## 4. 아키텍처 및 폴더 구조 (Extensibility Architecture)

추후 다양한 "술 관련 서비스" 확장을 위해 도메인(Feature) 중심의 구조를 채택합니다.

```text
src/
├── app/                  # Next.js App Router (Routing & Pages)
│   ├── layout.tsx
│   ├── page.tsx          # 메인 피드
│   ├── calendar/         # 술 달력 페이지
│   ├── my-page/          # 마이페이지 (리스트, 위시리스트)
│   └── sips/             # 술 상세 및 리뷰 등록
├── components/           # 프로젝트 전역 공통 컴포넌트 (Button, Input 등)
├── features/             # 도메인별 핵심 로직 및 비즈니스 컴포넌트 (확장성 핵심)
│   ├── calendar/         # 달력 관련 훅, 컴포넌트, 상태
│   ├── reviews/          # 시음 기록, 평점 관련 로직
│   └── wishlist/         # 위시리스트 관련 로직
├── hooks/                # 전역 공통 커스텀 훅
├── lib/                  # 외부 라이브러리 설정 (supabaseClient, utils 등)
├── store/                # 전역 상태 관리 (Zustand Stores)
└── types/                # 전역 TypeScript 타입 정의
```

---

## 5. UI/UX 디자인 가이드라인 (Premium & Dynamic Aesthetics)

본 프로젝트는 단순한 기능을 넘어 사용자에게 시각적 만족감을 주고 상호작용을 유도하는 **프리미엄(Premium) 웹 애플리케이션**을 지향합니다. 모든 컴포넌트와 화면 구현 시 아래 가이드를 항상 준수합니다.

### 1) 레이아웃 및 폼팩터 (Mobile-first)
* **Mobile-first Centered:** 데스크톱에서도 모바일 앱처럼 느껴지도록 중앙 정렬된 모바일 컨테이너(`max-w-md mx-auto`)를 기본 레이아웃으로 사용합니다.
* **여백(Spacing):** 넉넉한 여백(padding, margin)을 주어 답답하지 않고 시원한 공간감을 제공합니다.

### 2) 시각적 요소 (Visual Excellence)
* **컬러 팔레트 (Color Palette):** 단조로운 기본 색상(순수 빨강, 파랑 등)을 피하고 톤 다운되거나 깊이 있는 색상(예: 위스키를 연상시키는 Amber/Orange 포인트 컬러 또는 와인빛 Deep Violet)을 사용합니다.
* **다크 모드 & 질감:** 다크 모드를 적극 지원하며, 컴포넌트 배경에 단순한 단색보다는 부드러운 그라데이션, 글래스모피즘(`backdrop-blur`), 은은한 그림자(`shadow-sm`, `shadow-md`)를 사용하여 고급스러움을 더합니다.
* **타이포그래피:** 시스템 기본 폰트가 아닌 세련된 모던 폰트(Geist 등)를 사용하고, 계층(Hierarchy)에 따라 폰트 크기와 두께(font-weight)를 명확히 대비시킵니다.

### 3) 동적 상호작용 (Dynamic Design & Micro-animations)
* **Hover 및 Focus 효과:** 모든 상호작용 가능한 요소(버튼, 입력창, 링크)에는 부드러운 전환 효과(`transition-all duration-300`)와 함께 Hover/Focus 시 시각적 피드백(색상 변경, 약간의 스케일업 등)을 제공합니다.
* **페이지 전환 및 로딩:** 화면 진입 시 요소들이 부드럽게 나타나는 페이드인(Fade-in) 및 스케일(Scale) 애니메이션을 적용하여 앱이 '살아있는' 느낌을 줍니다. 
* **플레이스홀더:** 이미지 등에는 디자인 템플릿(Placeholder) 대신 서비스 무드에 맞는 목업 이미지를 사용하여 완성도를 높입니다.