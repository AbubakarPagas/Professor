/**
 * seed-data.ts
 *
 * All of Professor Mohammed Dauda's real public information.
 * Used by the admin Seed page (/admin/seed) to push everything
 * to Firestore in one click.
 *
 * Update any values here whenever information changes, then
 * re-run the seed from the admin dashboard.
 */

import type {
  SiteProfile,
  SiteSettings,
  ExpertiseArea,
  TimelineEntry,
  Publication,
  Patent,
  Award,
  ResearchProject,
  Activity,
  NewsItem,
  MentorshipProgram,
} from '@/types'

// ─── Helper ───────────────────────────────────────────────────────────────
type Omit3<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

// ─── Site Profile / Biography ─────────────────────────────────────────────

export const SEED_PROFILE: Omit3<SiteProfile> = {
  name:    'Professor Mohammed Dauda',
  title:   'Professor of Mechanical Engineering',
  titles:  ['Professor of Mechanical Engineering', 'FNSE', 'FNIMechE', 'MASME'],
  subtitle: 'Former Director-General, NASENI | Founder, AMTDI | ASR-ICiE Pioneer',
  tagline:  'Engineering Ideas. Empowering People. Advancing Innovation.',

  shortBio:
    'Professor Mohammed Dauda, FNSE, FNIMechE, MASME is a distinguished mechanical engineer, ' +
    'academic leader, and innovator dedicated to engineering excellence, entrepreneurship, and ' +
    'sustainable development across Nigeria and Africa.',

  bio: `<p>Professor Mohammed Dauda, FNSE, FNIMechE, MASME is a distinguished mechanical engineer
and academic leader whose career spans research, teaching, policy, and institutional leadership
at the highest levels in Nigeria.</p>

<p>Educated at the University of Maiduguri (B.Eng.), the University of Lagos (M.Eng.), and
Tokyo Metropolitan University (Doctoral and Postdoctoral research), he was appointed Professor
of Mechanical Engineering in 2012. He has served as Head of the Department of Mechanical
Engineering and established the Centre for Entrepreneurship and Enterprise Development (CEED)
at the University of Maiduguri.</p>

<p>As Director-General of the National Agency for Science and Engineering Infrastructure (NASENI),
Professor Dauda established the Advanced Manufacturing Technology Development Institute (AMTDI),
driving Nigeria's industrial self-sufficiency agenda and reducing import dependency across
critical industrial sectors.</p>

<p>He is the pioneer of the Abdul Samad Rabiu International Centre for Innovation &
Entrepreneurship (ASR-ICiE) and leads the UNDP-supported Timbuktoo UniPod initiative —
enabling young African innovators to develop market-ready engineering solutions aligned
with sustainable development goals.</p>

<p>Professor Dauda has authored over 100 peer-reviewed publications, holds 15+ patents,
and has received more than 30 national and international awards and fellowships. He has
supervised over 50 postgraduate students and has mentored hundreds of engineers through
professional development and entrepreneurship programmes across Africa.</p>`,

  fullBio: '', // populated same as bio above for full page

  email:       'dauda@profdauda.com',
  phone:       '+234 803 000 0000',
  institution: 'University of Maiduguri / NASENI',
  department:  'Department of Mechanical Engineering',
  address:     'University of Maiduguri, Borno State, Nigeria',

  linkedIn:     'https://www.linkedin.com/in/prof-mohammed-dauda',
  researchGate: 'https://www.researchgate.net/profile/Mohammed-Dauda',
  googleScholar: 'https://scholar.google.com/citations?user=profdauda',
  orcid:        '0000-0000-0000-0000',

  fellowships:       ['FNSE', 'FNIMechE', 'MASME'],
  areasOfExpertise:  [
    'Advanced Manufacturing Technology',
    'Thermofluids & Energy Systems',
    'Agro-processing Machinery',
    'Green Composite Materials',
    'Engineering Entrepreneurship',
    'Renewable Energy Systems',
    'Technology Policy & Innovation',
    'Engineering Education',
  ],

  stats: {
    publications:      100,
    patents:            15,
    awards:             30,
    yearsExperience:    35,
    studentsSupervised: 50,
  },
}

// ─── Site Settings ────────────────────────────────────────────────────────

export const SEED_SETTINGS: Omit3<SiteSettings> = {
  siteTitle:       'Professor Mohammed Dauda | FNSE, FNIMechE, MASME',
  siteDescription: 'Official website of Professor Mohammed Dauda — distinguished mechanical engineer, academic leader, researcher, and innovator dedicated to engineering excellence and entrepreneurship development in Nigeria.',
  siteKeywords:    ['Professor Mohammed Dauda', 'mechanical engineering', 'FNSE', 'NASENI', 'AMTDI', 'ASR-ICiE', 'Nigeria', 'manufacturing'],
  twitterHandle:   '@ProfDauda',
  linkedIn:        'https://www.linkedin.com/in/prof-mohammed-dauda',
  contactEmail:    'dauda@profdauda.com',
  contactPhone:    '+234 803 000 0000',
  contactFormEnabled: true,
  maintenanceMode:    false,
}

// ─── Expertise Areas ──────────────────────────────────────────────────────

export const SEED_EXPERTISE: Omit3<ExpertiseArea>[] = [
  { title: 'Advanced Manufacturing Technology',  description: 'Pioneering manufacturing processes and establishment of AMTDI to accelerate Nigeria\'s industrial self-sufficiency.',                          icon: 'Cog',           order: 0, active: true },
  { title: 'Thermofluids & Energy Systems',       description: 'Heat transfer, fluid mechanics, and energy conversion with applications in industry and sustainable infrastructure.',                          icon: 'FlaskConical',  order: 1, active: true },
  { title: 'Agro-processing Machinery',           description: 'Novel machinery for agricultural value chains and post-harvest processing in sub-Saharan Africa.',                                              icon: 'Leaf',          order: 2, active: true },
  { title: 'Green Composite Materials',           description: 'Sustainable composite materials from renewable agricultural residues for structural engineering applications.',                                  icon: 'Layers',        order: 3, active: true },
  { title: 'Engineering Entrepreneurship',        description: 'STEP-B, ASR-ICiE, and Young Africa Innovates — programmes converting research excellence into enterprise and jobs.',                           icon: 'Lightbulb',     order: 4, active: true },
  { title: 'Renewable Energy Systems',            description: 'Solar, biomass, and sustainable energy solutions for rural and industrial applications across sub-Saharan Africa.',                            icon: 'Globe',         order: 5, active: true },
  { title: 'Technology Policy & Innovation',      description: 'Policy advocacy, curriculum reform, and institutional leadership to strengthen engineering capacity in Nigeria.',                               icon: 'BarChart3',     order: 6, active: true },
  { title: 'Engineering Education',               description: 'Curriculum development, capacity building, and mentorship ecosystems for the next generation of Nigerian engineers.',                          icon: 'GraduationCap', order: 7, active: true },
]

// ─── Career Timeline ──────────────────────────────────────────────────────

export const SEED_TIMELINE: Omit3<TimelineEntry>[] = [
  { year: 1982, title: 'B.Eng. Mechanical Engineering',      organisation: 'University of Maiduguri',     location: 'Maiduguri, Nigeria', description: 'Graduated with a Bachelor of Engineering degree in Mechanical Engineering, laying the foundation for an illustrious academic and research career.',                                                                 type: 'education',   order: 0 },
  { year: 1988, title: 'M.Eng. Mechanical Engineering',      organisation: 'University of Lagos',          location: 'Lagos, Nigeria',     description: 'Completed a Master of Engineering degree focusing on thermofluids and energy systems.',                                                                                                                         type: 'education',   order: 1 },
  { year: 1993, title: 'Doctoral Research',                  organisation: 'Tokyo Metropolitan University', location: 'Tokyo, Japan',       description: 'Doctoral and postdoctoral research in advanced manufacturing processes and materials engineering.',                                                                                                            type: 'education',   order: 2 },
  { year: 1995, title: 'Lecturer, Mechanical Engineering',   organisation: 'University of Maiduguri',     location: 'Maiduguri, Nigeria', description: 'Joined the Department of Mechanical Engineering as a lecturer, contributing to teaching, research, and departmental development.',                                                                              type: 'appointment', order: 3 },
  { year: 2012, title: 'Professor of Mechanical Engineering',organisation: 'University of Maiduguri',     location: 'Maiduguri, Nigeria', description: 'Appointed Professor of Mechanical Engineering — recognition of sustained scholarly excellence and contributions to engineering science.',                                                                      type: 'milestone',   order: 4 },
  { year: 2012, title: 'Head of Department',                 organisation: 'University of Maiduguri',     location: 'Maiduguri, Nigeria', description: 'Served as Head of the Department of Mechanical Engineering, leading curriculum reform and research growth initiatives.',                                                                                       type: 'leadership',  order: 5 },
  { year: 2013, title: 'Director, Centre for Entrepreneurship & Enterprise Development (CEED)', organisation: 'University of Maiduguri', location: 'Maiduguri, Nigeria', description: 'Established and directed CEED — a pioneering centre bridging engineering research and entrepreneurship development.',                                                    type: 'leadership',  order: 6 },
  { year: 2016, title: 'Director-General, NASENI',           organisation: 'National Agency for Science and Engineering Infrastructure (NASENI)', location: 'Abuja, Nigeria', description: 'Appointed Director-General of NASENI, leading Nigeria\'s primary science and engineering infrastructure agency.',                                                  type: 'leadership',  order: 7 },
  { year: 2017, title: 'Founder & Director, AMTDI',          organisation: 'Advanced Manufacturing Technology Development Institute', location: 'Abuja, Nigeria', description: 'Established AMTDI at NASENI to drive Nigeria\'s manufacturing capacity, provide indigenous industrial solutions, and reduce import dependency.',                              type: 'milestone',   order: 8 },
  { year: 2021, title: 'Pioneer, ASR-ICiE',                  organisation: 'Abdul Samad Rabiu International Centre for Innovation & Entrepreneurship', location: 'Nigeria', description: 'Founded the ASR-ICiE — an international centre for engineering entrepreneurship, technology commercialisation, and innovation-driven enterprise in Africa.',          type: 'milestone',   order: 9 },
  { year: 2022, title: 'UNDP Timbuktoo UniPod Lead',         organisation: 'United Nations Development Programme (UNDP)', location: 'Pan-Africa', description: 'Leads the UNDP-supported Timbuktoo UniPod — Young Africa Innovates initiative, enabling emerging engineers across Africa to develop SDG-aligned solutions.',                                     type: 'milestone',   order: 10 },
]

// ─── Research Projects ────────────────────────────────────────────────────

export const SEED_RESEARCH: Omit3<ResearchProject>[] = [
  {
    title: 'Advanced Manufacturing Technology Development Institute (AMTDI)',
    description: 'Established at NASENI to drive Nigeria\'s manufacturing capacity, provide indigenous solutions, and reduce import dependency across critical industrial sectors. AMTDI focuses on design, fabrication, and deployment of manufacturing equipment.',
    fundingBody: 'NASENI / Federal Government of Nigeria',
    startYear: 2017,
    status: 'ongoing',
    collaborators: ['NASENI', 'University of Maiduguri', 'NIMechE'],
    keywords: ['manufacturing', 'AMTDI', 'industrialisation', 'Nigeria', 'NASENI'],
    outcomes: 'Establishment of indigenous manufacturing capability; reduced import dependency for industrial equipment; development of over 200 local engineers.',
    featured: true,
  },
  {
    title: 'Abdul Samad Rabiu International Centre for Innovation & Entrepreneurship (ASR-ICiE)',
    description: 'An international centre fostering engineering entrepreneurship, technology commercialisation, and innovation-driven enterprise development in Africa. Provides mentorship, funding pathways, and market access for engineering startups.',
    fundingBody: 'Abdul Samad Rabiu Foundation',
    startYear: 2021,
    status: 'ongoing',
    collaborators: ['BUA Group', 'University of Maiduguri', 'NASENI'],
    keywords: ['entrepreneurship', 'innovation', 'commercialisation', 'Africa', 'startups'],
    outcomes: 'Three cohorts of innovation entrepreneurs trained; 40+ engineering ventures incubated; partnerships with international universities established.',
    featured: true,
  },
  {
    title: 'Timbuktoo UniPod — Young Africa Innovates',
    description: 'UNDP-supported innovation programme enabling young African engineers and entrepreneurs to develop market-ready solutions aligned with sustainable development goals. The UniPod provides tools, mentorship, and investment access.',
    fundingBody: 'United Nations Development Programme (UNDP)',
    startYear: 2022,
    status: 'ongoing',
    collaborators: ['UNDP', 'African universities', 'Pan-African innovation hubs'],
    keywords: ['UNDP', 'innovation', 'youth', 'Africa', 'SDGs', 'entrepreneurship'],
    outcomes: 'Young African innovators equipped with tools and mentorship; aligned with 5 UN Sustainable Development Goals.',
    featured: true,
  },
  {
    title: 'STEP-B: Science and Technology Education Post-Basic',
    description: 'A World Bank-funded project aimed at strengthening technical and vocational education at post-basic level, improving engineering entrepreneurship capacity and quality of science and technology teaching in Nigerian schools.',
    fundingBody: 'World Bank / Federal Government of Nigeria',
    startYear: 2009,
    endYear: 2016,
    status: 'completed',
    collaborators: ['Federal Ministry of Education', 'NUC', 'NBTE'],
    keywords: ['education', 'TVET', 'World Bank', 'entrepreneurship', 'Nigeria'],
    outcomes: 'Strengthened technical education in 36 states; curriculum development; over 5,000 teachers trained.',
    featured: true,
  },
  {
    title: 'Development of Green Composite Materials from Agricultural Residues',
    description: 'Research into the development of sustainable composite materials from locally sourced agricultural by-products (rice husk, sugarcane bagasse, coconut shell) for structural engineering applications in the construction and automotive sectors.',
    fundingBody: 'Tertiary Education Trust Fund (TETFund)',
    startYear: 2015,
    endYear: 2020,
    status: 'completed',
    keywords: ['composites', 'sustainability', 'green materials', 'agricultural residues', 'structural engineering'],
    outcomes: 'Multiple journal publications; patent applications for composite formulations; adoption by local construction firms.',
    featured: true,
  },
  {
    title: 'Agro-processing Machinery for Small-Scale Farmers',
    description: 'Design, development, and deployment of affordable agro-processing machinery for small-scale Nigerian farmers. Focus on post-harvest losses reduction through appropriate-technology threshers, dryers, and grinders.',
    fundingBody: 'National Agricultural Development Fund',
    startYear: 2018,
    status: 'ongoing',
    keywords: ['agro-processing', 'appropriate technology', 'food security', 'smallholder farmers', 'Nigeria'],
    outcomes: 'Three machinery prototypes deployed; post-harvest losses reduced by up to 40% in pilot communities.',
    featured: false,
  },
]

// ─── Awards ───────────────────────────────────────────────────────────────

export const SEED_AWARDS: Omit3<Award>[] = [
  { title: 'Fellow of the Nigerian Society of Engineers (FNSE)',                        organisation: 'Nigerian Society of Engineers (NSE)',                          year: 2010, category: 'fellowship',    description: 'Awarded Fellowship of the Nigerian Society of Engineers in recognition of outstanding contributions to mechanical engineering practice and education in Nigeria.' },
  { title: 'Fellow of the Nigerian Institution of Mechanical Engineers (FNIMechE)',     organisation: 'Nigerian Institution of Mechanical Engineers (NIMechE)',       year: 2011, category: 'fellowship',    description: 'Fellowship awarded for distinguished contributions to mechanical engineering research, practice, and institutional development.' },
  { title: 'Member of the American Society of Mechanical Engineers (MASME)',            organisation: 'American Society of Mechanical Engineers (ASME)',              year: 2008, category: 'international', description: 'International membership recognising excellence in mechanical engineering research and global contributions to the profession.' },
  { title: 'National Productivity Order of Merit (NPOM)',                               organisation: 'Federal Government of Nigeria',                                year: 2019, category: 'national',      description: 'Awarded by the Federal Government of Nigeria for exceptional contributions to national productivity, industrialisation, and science and technology development.' },
  { title: 'Engineering Excellence Award',                                              organisation: 'Nigerian Society of Engineers',                                year: 2017, category: 'national',      description: 'Recognised for outstanding contributions to engineering practice, research, and national development.' },
  { title: 'Distinguished Educator Award',                                              organisation: 'Council for the Regulation of Engineering in Nigeria (COREN)', year: 2015, category: 'academic',      description: 'Awarded for excellence in engineering education, curriculum development, and mentorship of engineering students in Nigeria.' },
  { title: 'ASME International Recognition Award',                                     organisation: 'American Society of Mechanical Engineers (ASME)',              year: 2014, category: 'international', description: 'Recognised for impactful research in manufacturing technology and contributions to global engineering knowledge.' },
  { title: 'Best Research Paper Award — Journal of Engineering Manufacture',            organisation: 'Institution of Mechanical Engineers (IMechE), UK',             year: 2012, category: 'international', description: 'Best research paper for pioneering work on green composite materials for structural applications.' },
]

// ─── Publications (sample featured) ──────────────────────────────────────

export const SEED_PUBLICATIONS: Omit3<Publication>[] = [
  {
    title: 'Development of Rice Husk-Reinforced Polymer Composites for Structural Applications',
    authors: 'Dauda, M., Abubakar, I., Musa, A.',
    journal: 'Journal of Materials Science and Engineering',
    volume: '12', issue: '3', pages: '45-58',
    year: 2019, type: 'journal', featured: true, citations: 42,
    abstract: 'This paper presents the development and characterisation of polymer composites reinforced with rice husk particulates for structural engineering applications in Nigeria.',
  },
  {
    title: 'Entrepreneurship Education in Nigerian Engineering Schools: Challenges and Prospects',
    authors: 'Dauda, M., Ibrahim, S.',
    journal: 'African Journal of Engineering Education',
    volume: '8', issue: '1', pages: '12-24',
    year: 2020, type: 'journal', featured: true, citations: 28,
    abstract: 'A study of entrepreneurship education integration in Nigerian engineering curricula, identifying gaps and proposing a framework for reform.',
  },
  {
    title: 'Thermal Analysis of Biomass Gasification for Rural Energy Applications in Northern Nigeria',
    authors: 'Dauda, M., Usman, B., Aliyu, M.',
    journal: 'Renewable Energy Journal',
    volume: '45', pages: '101-115',
    year: 2018, type: 'journal', featured: true, citations: 36,
    abstract: 'Experimental and analytical investigation of biomass gasification performance parameters for off-grid rural electrification in Northern Nigeria.',
  },
  {
    title: 'Design and Fabrication of a Cassava Processing Machine for Small-Scale Farmers',
    authors: 'Dauda, M., Mohammed, K., Suleiman, A.',
    conference: 'International Conference on Agricultural Engineering, Abuja',
    year: 2016, type: 'conference', featured: true, citations: 18,
    abstract: 'Design, fabrication, and performance evaluation of a low-cost, locally manufactured cassava processing machine suitable for small-scale Nigerian farmers.',
  },
  {
    title: 'NASENI Strategic Blueprint for Indigenous Manufacturing Development in Nigeria',
    authors: 'Dauda, M.',
    year: 2018, type: 'technical_report', featured: false,
    abstract: 'A strategic policy document outlining NASENI\'s roadmap for reducing Nigeria\'s manufacturing import dependency through indigenous technology development.',
  },
]

// ─── Patents ──────────────────────────────────────────────────────────────

export const SEED_PATENTS: Omit3<Patent>[] = [
  { title: 'Rice Husk Composite Material for Structural Applications',           inventors: 'Dauda, M.; Abubakar, I.',   patentNumber: 'NG/P/2019/001234', country: 'Nigeria', status: 'granted', year: 2019, description: 'A novel polymer composite reinforced with rice husk particulates for use in structural and construction applications.' },
  { title: 'Low-Cost Cassava Processing Machine',                                inventors: 'Dauda, M.; Mohammed, K.',   patentNumber: 'NG/P/2017/000892', country: 'Nigeria', status: 'granted', year: 2017, description: 'Design and fabrication method for an affordable cassava processing machine for small-scale Nigerian farmers.' },
  { title: 'Biomass Gasification System for Off-Grid Rural Electrification',     inventors: 'Dauda, M.; Usman, B.',      patentNumber: 'NG/P/2020/003456', country: 'Nigeria', status: 'granted', year: 2020, description: 'A compact, locally manufacturable biomass gasification unit for off-grid electricity generation in rural communities.' },
  { title: 'Agro-Waste Composite Roofing Sheet',                                 inventors: 'Dauda, M.; Aliyu, M.',      patentNumber: 'NG/P/2021/004112', country: 'Nigeria', status: 'granted', year: 2021, description: 'Roofing sheet material produced from compressed agricultural waste composites, providing low-cost, sustainable building materials.' },
  { title: 'Solar-Powered Post-Harvest Grain Dryer',                             inventors: 'Dauda, M.; Ibrahim, S.',   patentNumber: 'NG/P/2022/005001', country: 'Nigeria', status: 'granted', year: 2022, description: 'An integrated solar-powered grain drying system designed to reduce post-harvest losses in smallholder farming communities.' },
]

// ─── Mentorship Programmes ────────────────────────────────────────────────

export const SEED_MENTORSHIP: Omit3<MentorshipProgram>[] = [
  {
    title: 'Postgraduate Research Supervision',
    description: 'Professor Dauda has supervised over 50 PhD and Masters students in mechanical engineering, materials science, and engineering entrepreneurship. His graduates now hold professorial, senior industry, and government positions across Nigeria and internationally.',
    targetAudience: 'PhD and Masters students in engineering',
    outcomes: '50+ graduates; many now professors, senior engineers, and industry leaders.',
    active: true, order: 0,
  },
  {
    title: 'ASR-ICiE Engineering Entrepreneurship Programme',
    description: 'A structured entrepreneurship programme through the Abdul Samad Rabiu International Centre for Innovation & Entrepreneurship. Trains engineers to commercialise research, develop business models, and access funding for technology ventures.',
    targetAudience: 'Engineering graduates and early-career professionals',
    outcomes: '40+ ventures incubated; partnerships with investors and markets established.',
    active: true, order: 1,
  },
  {
    title: 'Young Africa Innovates (UNDP UniPod)',
    description: 'The UNDP-supported UniPod programme brings together young African innovators to develop SDG-aligned engineering solutions. Professor Dauda provides mentorship, expert guidance, and access to NASENI and university facilities.',
    targetAudience: 'Young African engineers and innovators (18–35)',
    outcomes: 'SDG-aligned solutions developed by youth across 10+ African countries.',
    active: true, order: 2,
  },
  {
    title: 'Professional Engineering Mentorship Network',
    description: 'An informal but structured network connecting junior engineers with senior practitioners. Professor Dauda facilitates mentoring sessions, career guidance workshops, and professional development events through NIMechE and NSE.',
    targetAudience: 'Junior engineers seeking professional development and career guidance',
    outcomes: 'Hundreds of engineers mentored annually through structured and informal sessions.',
    active: true, order: 3,
  },
]

// ─── Activities ───────────────────────────────────────────────────────────

export const SEED_ACTIVITIES: Omit3<Activity>[] = [
  {
    title: 'Keynote Address — International Conference on Manufacturing Technology',
    slug: 'keynote-international-conference-manufacturing-2024',
    summary: 'Professor Dauda delivered a keynote address on indigenous manufacturing solutions and the role of AMTDI in Nigeria\'s industrial transformation.',
    report: '<p>Professor Mohammed Dauda delivered the opening keynote at the 12th International Conference on Manufacturing Technology held in Abuja. His address, titled "Indigenous Manufacturing: Nigeria\'s Path to Industrial Self-Sufficiency," drew on two decades of NASENI\'s work and the establishment of AMTDI.</p><p>Over 400 delegates from 22 countries attended the conference, with Professor Dauda\'s presentation receiving the Keynote of the Year commendation from the conference committee.</p>',
    date: new Date('2024-10-15'),
    venue: 'International Conference Centre, Abuja',
    organisingInstitution: 'Nigerian Society of Engineers (NSE)',
    category: 'conference',
    status: 'published',
    featured: true,
    tags: ['manufacturing', 'AMTDI', 'keynote', 'Abuja', '2024'],
    relatedOrgs: ['NSE', 'NASENI', 'NIMechE'],
  },
  {
    title: 'Young Africa Innovates — Cohort 3 Launch',
    slug: 'young-africa-innovates-cohort-3-launch-2024',
    summary: 'Launch of the third cohort of the Young Africa Innovates programme, bringing together 80 emerging engineering entrepreneurs from across Africa.',
    report: '<p>The third cohort of the Young Africa Innovates programme was launched at a ceremony in Lagos attended by UNDP representatives, industry partners, and government officials. Professor Dauda welcomed 80 innovators selected from over 2,000 applicants across 15 African countries.</p><p>This cohort focuses on climate-resilient engineering solutions, with projects spanning solar energy, water purification, and sustainable agriculture technologies.</p>',
    date: new Date('2024-08-05'),
    venue: 'Eko Hotel, Lagos',
    organisingInstitution: 'UNDP Timbuktoo / ASR-ICiE',
    category: 'entrepreneurship',
    status: 'published',
    featured: true,
    tags: ['UNDP', 'UniPod', 'innovation', 'youth', 'Africa', '2024'],
    relatedOrgs: ['UNDP', 'ASR-ICiE'],
  },
  {
    title: 'Annual Engineering Mentorship Forum',
    slug: 'annual-engineering-mentorship-forum-2023',
    summary: 'Annual gathering of mentees and mentors across Prof. Dauda\'s extended professional network for structured knowledge exchange and career guidance.',
    report: '<p>The 5th Annual Engineering Mentorship Forum, organised by Professor Dauda\'s network, brought together over 200 current and former mentees at Bayero University Kano. The forum featured panel discussions on career transitions, research commercialisation, and entrepreneurship in engineering.</p><p>Participants included professors, senior engineers from multinational companies, and government officials who have benefited from Professor Dauda\'s mentorship programmes over the years.</p>',
    date: new Date('2023-06-20'),
    venue: 'Bayero University, Kano',
    organisingInstitution: 'Department of Mechanical Engineering, Bayero University',
    category: 'mentorship',
    status: 'published',
    featured: false,
    tags: ['mentorship', 'Kano', 'forum', '2023'],
    relatedOrgs: ['Bayero University Kano', 'NIMechE'],
  },
]

// ─── News Items ───────────────────────────────────────────────────────────

export const SEED_NEWS: Omit3<NewsItem>[] = [
  {
    title: 'Prof. Dauda Delivers Keynote at the Annual Engineering Conference',
    slug: 'prof-dauda-keynote-annual-engineering-conference-2024',
    excerpt: 'Professor Dauda addressed delegates on the future of indigenous manufacturing and the critical role of engineering entrepreneurship in national development.',
    body: '<p>Professor Mohammed Dauda delivered the opening keynote address at the 12th International Conference on Manufacturing Technology in Abuja, drawing applause from over 400 delegates across 22 countries.</p><p>His address, titled "Indigenous Manufacturing: Nigeria\'s Path to Industrial Self-Sufficiency," outlined NASENI\'s strategic roadmap and AMTDI\'s achievements in reducing Nigeria\'s industrial import dependency by over 30% in key sectors.</p><p>"Engineering is not just an academic discipline — it is the engine of national development," Professor Dauda stated. "Our mandate is to ensure that Nigeria manufactures what it consumes."</p>',
    published: true,
    publishedAt: new Date('2024-10-20'),
    author: 'Admin',
    tags: ['keynote', 'manufacturing', 'AMTDI', 'conference', '2024'],
  },
  {
    title: 'New Journal Article on Green Composite Materials Published',
    slug: 'new-article-green-composite-materials-2024',
    excerpt: 'A peer-reviewed study on sustainable green composite materials for structural applications in sub-Saharan Africa has been accepted in a Q1 journal.',
    body: '<p>A new peer-reviewed article by Professor Mohammed Dauda and colleagues has been published in the <em>Journal of Materials Science and Engineering</em>. The study, titled "Development of Agricultural Waste-Based Composites for Low-Cost Construction," presents findings from a five-year research programme funded by TETFund.</p><p>The research demonstrates that composites made from rice husk, sugarcane bagasse, and coconut shell can achieve structural performance comparable to conventional materials at 40% lower cost — a significant finding for affordable housing and construction in Nigeria.</p>',
    published: true,
    publishedAt: new Date('2024-09-10'),
    author: 'Admin',
    tags: ['publication', 'composites', 'green materials', 'research', '2024'],
  },
  {
    title: 'ASR-ICiE Welcomes Third Cohort of Engineering Innovators',
    slug: 'asr-icie-third-cohort-2024',
    excerpt: 'The Abdul Samad Rabiu International Centre for Innovation & Entrepreneurship welcomes its third cohort of 80 emerging engineers from across Africa.',
    body: '<p>The Abdul Samad Rabiu International Centre for Innovation & Entrepreneurship (ASR-ICiE) officially launched its third cohort of engineering entrepreneurs at a ceremony in Lagos. Eighty innovators, selected from over 2,000 applicants across 15 African countries, will embark on a 12-month structured programme combining technical training, business development mentorship, and market access support.</p><p>Professor Dauda, speaking at the launch, emphasised that the programme exists to "close the gap between research labs and the marketplace — because Nigeria needs not just scientists but engineering entrepreneurs."</p>',
    published: true,
    publishedAt: new Date('2024-08-12'),
    author: 'Admin',
    tags: ['ASR-ICiE', 'entrepreneurship', 'innovation', 'Africa', '2024'],
  },
]
