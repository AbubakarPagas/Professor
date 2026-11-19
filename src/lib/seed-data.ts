/**
 * seed-data.ts
 *
 * Professor Mohammed Dauda — accurate public information.
 * Source: CV 2025 NO Personal Details; Publications etc.;
 *         Mohammed_Dauda_Website_Publications_Patents_Register;
 *         Research-to-Impact Portfolio & Career Timeline document (all 17 Nov 2026).
 *
 * ── Editorial policy (§7 database rules) ──────────────────────────────────
 *  - Create distinct records for Publication, Patent/IP, Project, Career Milestone,
 *    Organisation, Person/Collaborator, Award, Media Asset and Evidence Source.
 *  - Link publications to projects by an explicit many-to-many relationship, not
 *    by identical keywords alone.
 *  - Every project record must carry: role, dates, partners, stage, evidence,
 *    public summary and owner approval before publication.
 *  - Patent fields: title, inventors, jurisdiction, application/publication/grant
 *    numbers, assignee, status, verified source URL, last checked date.
 *  - Editorial states: Draft → Fact-check → Owner approval → Published → Archived.
 *    Never publish automatically from imported CV data.
 *  - The 26 journal and 18 conference entries remain CV-reported until independently
 *    validated. Preserve author order and original titles; document corrections.
 *  - Treat conference presentations, invited lectures, proceedings and journal
 *    articles as different publication types.
 *  - Patent RP numbers are documentary claims, not proof of granted/enforceable status.
 *  - Japanese record JP2009138105 has kind-code A (application publication, not grant).
 *  - Two 2024 journal DOIs are nonstandard; do not render as functional links.
 *  - Theses are unpublished academic records; keep visibility set to private/draft.
 *
 * ── Outstanding reconciliation items (§8) ─────────────────────────────────
 *  □  Original certificates or official registry extracts for NG/P/2016/47, /48, /98, /99.
 *  □  Official legal history for JP2009138105 A — confirm inventor order, assignee,
 *     any grant number.
 *  □  Publisher/proceedings copies to settle the 2015 cybersecurity co-author conflict
 *     (Ashafa M.S. vs Shehu M.A.) and the 2014 e-government four-author list.
 *  □  Publisher metadata for 2024 papers with nonstandard DOI strings, 2013 V-belt
 *     pulley pagination (page range resembles ISSN), and 2018 hardfacing DOI.
 *  □  Appointment letters to distinguish NASENI executive titles and overlapping dates.
 *  □  Japanese award citation/certificate to distinguish 2024 award year from any
 *     2025 ceremony date.
 *  □  Owner-approved project photos, captions, collaborator permissions, research
 *     results and documented impact indicators.
 *  □  Final status of mechatronics manuscript, fish dryer research validation, and
 *     UniPod launch milestones.
 *
 * Updated: 17 November 2026.
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
  title:   'Professor of Mechanical Engineering (Materials)',
  titles:  ['Professor of Mechanical Engineering (Materials)', 'FNSE', 'FNIMechE'],
  subtitle: 'Director, ASR-ICiE | Coordinator, UNDP UniPod | University of Maiduguri',
  tagline:  'Engineering Ideas. Empowering People. Advancing Innovation.',

  shortBio:
    'Prof. Mohammed Dauda is a Professor of Mechanical Engineering (Materials) at the University of ' +
    'Maiduguri, researcher and innovation leader. His work links materials and manufacturing research ' +
    'to technology development, entrepreneurship education and practical opportunities for communities. ' +
    'He currently leads ASR-ICiE and coordinates the UNDP-supported UniPod at the University of Maiduguri.',

  bio: `<p>Professor Mohammed Dauda, FNSE, FNIMechE, is a Professor of Mechanical Engineering specialising in materials at the University of Maiduguri, Nigeria. His professional career encompasses engineering education, materials research, advanced manufacturing, technology development, institutional leadership and innovation-driven entrepreneurship.</p>

<p>He obtained his Bachelor of Engineering in Mechanical Engineering from the University of Maiduguri in 1990 and his Master of Science in Mechanical Engineering from the University of Lagos in 1994. He subsequently undertook research training in Japan, earning a Doctor of Engineering in Materials from Tokyo Metropolitan University in 2002.</p>

<p>His international academic experience includes a UNESCO/People's Republic of China Great Wall Fellowship at Northeastern University, Shenyang, from 2003 to 2004, and a Japan Society for the Promotion of Science postdoctoral research fellowship from 2005 to 2007.</p>

<p>Beginning his university career in 1992, Professor Dauda progressed through the academic ranks and became a Professor of Mechanical Engineering in 2012. He has contributed to teaching, postgraduate supervision, curriculum development and research across engineering materials, manufacturing technologies and related fields.</p>

<p>His engineering leadership extends beyond the university. At the National Agency for Science and Engineering Infrastructure (NASENI), he played a pioneering role in the development and management of the Advanced Manufacturing Technology Development Institute, Jalingo. He also served as Director of Engineering Infrastructure at NASENI headquarters and participated in national technology-development and capacity-building initiatives.</p>

<p>Returning to university-based institutional leadership, he served as Director of the Centre for Entrepreneurship and Enterprise Development at the University of Maiduguri from December 2020 to February 2025.</p>

<p>Since February 2025, he has served as Director of ASR-ICiE and Coordinator of the UNDP-supported UniPod, advancing multidisciplinary innovation, prototyping, entrepreneurship, creative technologies and youth skills development.</p>

<p>His research and professional interests include natural-fibre composites, advanced engineering materials, manufacturing processes, renewable energy technologies, engineering product development, technology transfer and university–industry collaboration.</p>

<p>Professor Dauda is a Fellow of the Nigerian Society of Engineers and the Nigerian Institution of Mechanical Engineers, and a registered engineer with COREN. His international recognition includes the Order of the Rising Sun from the Government of Japan, alongside awards and fellowships supporting research, teaching innovation and international academic exchange.</p>`,

  fullBio:
    '<p>Professor Mohammed Dauda, FNSE, FNIMechE, is a Professor of Mechanical Engineering specialising in materials at the University of Maiduguri, Nigeria. His professional career encompasses engineering education, materials research, advanced manufacturing, technology development, institutional leadership and innovation-driven entrepreneurship.</p>' +
    '<p>He obtained his Bachelor of Engineering in Mechanical Engineering from the University of Maiduguri in 1990 and his Master of Science in Mechanical Engineering from the University of Lagos in 1994. He subsequently undertook research training in Japan, earning a Doctor of Engineering in Materials from Tokyo Metropolitan University in 2002.</p>' +
    '<p>His international academic experience includes a UNESCO/People\'s Republic of China Great Wall Fellowship at Northeastern University, Shenyang, from 2003 to 2004, and a Japan Society for the Promotion of Science postdoctoral research fellowship from 2005 to 2007.</p>' +
    '<p>Beginning his university career in 1992, Professor Dauda progressed through the academic ranks and became a Professor of Mechanical Engineering in 2012. He has contributed to teaching, postgraduate supervision, curriculum development and research across engineering materials, manufacturing technologies and related fields.</p>' +
    '<p>His engineering leadership extends beyond the university. At the National Agency for Science and Engineering Infrastructure (NASENI), he played a pioneering role in the development and management of the Advanced Manufacturing Technology Development Institute, Jalingo. He also served as Director of Engineering Infrastructure at NASENI headquarters and participated in national technology-development and capacity-building initiatives.</p>' +
    '<p>Returning to university-based institutional leadership, he served as Director of the Centre for Entrepreneurship and Enterprise Development at the University of Maiduguri from December 2020 to February 2025.</p>' +
    '<p>Since February 2025, he has served as Director of ASR-ICiE and Coordinator of the UNDP-supported UniPod, advancing multidisciplinary innovation, prototyping, entrepreneurship, creative technologies and youth skills development.</p>' +
    '<p>His research and professional interests include natural-fibre composites, advanced engineering materials, manufacturing processes, renewable energy technologies, engineering product development, technology transfer and university–industry collaboration.</p>' +
    '<p>Professor Dauda is a Fellow of the Nigerian Society of Engineers and the Nigerian Institution of Mechanical Engineers, and a registered engineer with COREN. His international recognition includes the Order of the Rising Sun from the Government of Japan, alongside awards and fellowships supporting research, teaching innovation and international academic exchange.</p>' +
    '<p>His professional mission is to help transform knowledge, engineering capability and human talent into practical innovations that improve livelihoods, strengthen institutions and expand opportunities for future generations.</p>',

  email:       'mdsmatt@gmail.com',
  phone:       '+234 703 528 5530',
  institution: 'University of Maiduguri',
  department:  'Department of Mechanical Engineering',
  address:     'University of Maiduguri, Borno State, Nigeria',

  linkedIn:      'https://www.linkedin.com/in/mdsmatt',
  researchGate:  'https://www.researchgate.net/profile/Mohammed-Dauda',
  googleScholar: 'https://scholar.google.com/citations?user=yC5lXw4AAAAJ&hl',
  orcid:         '0000-0000-0000-0000', // verify and update

  fellowships:      ['FNSE', 'FNIMechE'],
  areasOfExpertise: [
    'Green Composite & Natural-Fibre Materials',
    'Advanced Manufacturing Technology',
    'Agro-processing Machinery',
    'Renewable Energy & Solar Systems',
    'Waste Recovery & Circular Economy',
    'Engineering Entrepreneurship & Innovation',
    'Digital Systems & Mechatronics',
    'Engineering Education',
  ],

  stats: {
    // Source: register count — 26 journal + 18 conference + 2 books + 3 theses = 49 scholarly records; 5 patent-related entries
    publications:      44, // journal + conference papers (pending independent verification)
    patents:            5, // CV-reported; legal status pending certificate/registry check
    awards:            30, // includes fellowships and international recognitions; verify exact count
    yearsExperience:   32, // 1992 to 2026 (approximate)
    studentsSupervised: 50, // approximate; verify from supervision records
  },
}

// ─── Site Settings ────────────────────────────────────────────────────────

export const SEED_SETTINGS: Omit3<SiteSettings> = {
  siteTitle:       'Professor Mohammed Dauda | FNSE, FNIMechE',
  siteDescription:
    'Official website of Professor Mohammed Dauda — Professor of Mechanical Engineering (Materials) ' +
    'at the University of Maiduguri, Director of ASR-ICiE, and Coordinator of the UNDP-supported UniPod.',
  siteKeywords: [
    'Professor Mohammed Dauda',
    'mechanical engineering',
    'FNSE',
    'FNIMechE',
    'ASR-ICiE',
    'UniPod',
    'NASENI',
    'AMTDI',
    'University of Maiduguri',
    'green composites',
    'natural-fibre composites',
    'agro-processing',
    'fish dryer research',
    'manufacturing technology',
    'entrepreneurship',
    'Nigeria',
  ],
  twitterHandle:      '@ProfMDauda',       // verify handle
  linkedIn:           'https://www.linkedin.com/in/mdsmatt',
  contactEmail:       'mdsmatt@gmail.com', // replace with professional domain when available
  contactPhone:       '+234 703 528 5530',
  contactFormEnabled: true,
  maintenanceMode:    false,
}

// ─── Expertise Areas ──────────────────────────────────────────────────────
// Descriptions draw on the Research-to-Impact table (§4) from the
// Research & Career Portfolio document, 17 Nov 2026.
// Website placement notes are included as inline comments.

export const SEED_EXPERTISE: Omit3<ExpertiseArea>[] = [
  {
    title: 'Green Composite & Natural-Fibre Materials',
    // Website: Research portfolio — Green Composites
    // Verification: JP2009138105 A is an application publication, not a grant. Confirm inventors and legal status.
    description:
      'Natural-fibre-reinforced composites using maize, bagasse and recycled polypropylene (2000–2007). ' +
      'Evidence: 10 peer-reviewed journal articles, 2006 Ecomaterials Handbook chapter, and Japanese ' +
      'composite-material application JP2009138105 A. Focus: materials processing, mechanical properties ' +
      'and environmental performance. Status: historic research outputs; IP status pending verification.',
    icon: 'Layers',
    order: 0,
    active: true,
  },
  {
    title: 'Advanced Manufacturing Technology',
    // Website: Engineering Technologies; NASENI Leadership
    // Verification: Differentiate individual research authorship from NASENI team projects.
    description:
      'Manufacturing processes, engineering design, materials selection and fabrication technologies. ' +
      'Evidence: 2013–2020 pulley, jaw-crusher, hardfacing and manufacturing papers; 2015 manufacturing ' +
      'conference contributions; NASENI AMTDI executive leadership and engineering infrastructure work (2010–2019).',
    icon: 'Cog',
    order: 1,
    active: true,
  },
  {
    title: 'Agro-processing Machinery',
    // Website: Agro-processing Technology Portfolio
    // Verification: Four Nigerian RP numbers need certificate/registry checks. Distinguish NASENI dryers
    // from the later MCRP fish dryer research prototype.
    description:
      'Design and development of rice threshers, fish dryers, multi-grain threshers, and automated ' +
      'gari fryers. Evidence: 2014 automated gari fryer paper; 2016 AMT-P patent-related records ' +
      '(NG/P/2016/47, /48, /98, /99) for NASENI institutional products.',
    icon: 'Leaf',
    order: 2,
    active: true,
  },
  {
    title: 'Renewable Energy & Circular Economy',
    // Website: Sustainable Engineering & Community Impact
    // Verification: Do not infer commercial deployment from research publications.
    description:
      'High-concentration solar cooker design, solar-powered forced-air fish drying, biogas from ' +
      'cassava peels, municipal solid waste characterisation, incineration modelling and material ' +
      'recovery studies. Evidence: 2000 agricultural waste recovery paper; 2010–2017 solar, waste, ' +
      'biogas and recycling publications; Lake Chad basin water-quality studies.',
    icon: 'Sun',
    order: 3,
    active: true,
  },
  {
    title: 'Digital Systems & Mechatronics',
    // Website: Digital Innovation; Scholarly Manuscripts
    // Verification: Mark mechatronics textbook as manuscript until a publishing record is confirmed.
    description:
      'Image processing, SVM and CNN classification for medical imaging (2014–2019); e-government ' +
      'identity management; HPC infrastructure as an engineering design enabler; mechatronics textbook ' +
      'manuscript (2026, unconfirmed publisher). Related contribution: UniPod cross-disciplinary labs.',
    icon: 'Cpu',
    order: 4,
    active: true,
  },
  {
    title: 'Engineering Entrepreneurship & Innovation',
    // Website: Innovation Leadership; Skills Development
    // Verification: State grant and implementation status using approved project records.
    description:
      'CEED directorship (Dec 2020–Feb 2025); ASR-ICiE directorship (Feb 2025–present); UNDP UniPod ' +
      'coordination; TETFund Mobile STEM School as principal investigator. Evidence: 2012 innovative ' +
      'teaching paper; 2022–2025 entrepreneurship and skills engagements.',
    icon: 'Lightbulb',
    order: 5,
    active: true,
  },
  {
    title: 'Fish Drying Research',
    // Website: Flagship Project — Fish Dryer Research
    // Verification: Not the same invention as NASENI AMT-P patent entries without documented
    // technical and legal link. Do not conflate with NG/P/2016/48 or /98.
    description:
      'MCRP research prototype comparing indirect combustion heating against the traditional half-drum ' +
      'kiln. Features: insulated drying chamber, solar-powered forced-air circulation, alternative fuel ' +
      'trials. Evidence: prototype photographs, preliminary comparative tests, research fair application. ' +
      'Status: validation and independent testing ongoing/proposed.',
    icon: 'Flame',
    order: 6,
    active: true,
  },
  {
    title: 'Engineering Education',
    // Website: Innovation Leadership; Skills Development
    description:
      'Innovative teaching methods (2012); entrepreneurship curriculum development; postgraduate ' +
      'supervision; community STEM outreach through the TETFund Mobile STEM School.',
    icon: 'GraduationCap',
    order: 7,
    active: true,
  },
]

// ─── Career Timeline ──────────────────────────────────────────────────────
// Source: CV 2025 — verify appointment letters for NASENI executive dates.

export const SEED_TIMELINE: Omit3<TimelineEntry>[] = [
  {
    year: 1990,
    title: 'B.Eng. Mechanical Engineering',
    organisation: 'University of Maiduguri',
    location: 'Maiduguri, Nigeria',
    description: 'Graduated with a Bachelor of Engineering degree in Mechanical Engineering.',
    type: 'education',
    order: 0,
  },
  {
    year: 1992,
    title: 'Graduate Assistant',
    organisation: 'University of Maiduguri',
    location: 'Maiduguri, Nigeria',
    description: 'Joined the University of Maiduguri as Graduate Assistant in the Department of Mechanical Engineering.',
    type: 'appointment',
    order: 1,
  },
  {
    year: 1994,
    title: 'M.Sc. Mechanical Engineering',
    organisation: 'University of Lagos',
    location: 'Lagos, Nigeria',
    description:
      'Completed a Master of Science degree in Mechanical Engineering. ' +
      'Thesis: "Quality Engineering and Management in Nigerian Manufacturing Industries."',
    type: 'education',
    order: 2,
  },
  {
    year: 1997,
    title: 'D.Eng. Materials, Tokyo Metropolitan University',
    organisation: 'Tokyo Metropolitan University',
    location: 'Tokyo, Japan',
    description:
      'Japanese government scholarship and doctoral research (1997–2002). ' +
      'Graduated with a Doctor of Engineering in Materials, 2002. ' +
      'Thesis: "Processing and Property Evaluation of Long Natural Fiber Reinforced Composites ' +
      'Through Recycling of Tropical Plant Wastes."',
    type: 'education',
    order: 3,
    endYear: 2002,
  },
  {
    year: 2003,
    title: 'UNESCO/China Great Wall Fellowship',
    organisation: 'Northeastern University',
    location: 'Shenyang, China',
    description: 'UNESCO/China Great Wall Fellowship for research at Northeastern University, Shenyang (2003–2004).',
    type: 'education',
    order: 4,
    endYear: 2004,
  },
  {
    year: 2005,
    title: 'JSPS Postdoctoral Research Fellowship',
    organisation: 'Japan Society for the Promotion of Science',
    location: 'Japan',
    description: 'Japan Society for the Promotion of Science (JSPS) postdoctoral research fellowship (2005–2007).',
    type: 'education',
    order: 5,
    endYear: 2007,
  },
  {
    year: 2007,
    title: 'Associate Professor',
    organisation: 'University of Maiduguri',
    location: 'Maiduguri, Nigeria',
    description: 'Academic promotion to Associate Professor (per CV reconciliation; verify exact date).',
    type: 'appointment',
    order: 6,
  },
  {
    year: 2010,
    title: 'Executive Leadership, AMTDI Jalingo (NASENI)',
    organisation: 'Advanced Manufacturing Technology Development Institute (AMTDI), NASENI',
    location: 'Jalingo, Nigeria',
    description:
      'Pioneering executive leadership at AMTDI Jalingo under NASENI (2010–2019). ' +
      'Led engineering infrastructure development and agro-processing technology programmes. ' +
      'Confirm individual appointment title and exact dates from appointment letters.',
    type: 'leadership',
    order: 7,
  },
  {
    year: 2012,
    title: 'Professor of Mechanical Engineering',
    organisation: 'University of Maiduguri',
    location: 'Maiduguri, Nigeria',
    description: 'Promoted to Professor of Mechanical Engineering (per professional CV).',
    type: 'milestone',
    order: 8,
  },
  {
    year: 2016,
    title: 'Patent-Related Records Filed (NASENI)',
    organisation: 'Advanced Manufacturing Technology Programme (AMT-P), NASENI',
    location: 'Nigeria',
    description:
      'Five patent-related records reported across Nigeria (NG/P/2016/47, /48, /98, /99) and ' +
      'Japan (JP2009138105 A). Nigerian RP numbers require certificate/registry verification; ' +
      'Japanese record is a publication of application (kind code A), not a grant certificate.',
    type: 'milestone',
    order: 9,
  },
  {
    year: 2020,
    title: 'Director, Centre for Entrepreneurship and Enterprise Development (CEED)',
    organisation: 'University of Maiduguri',
    location: 'Maiduguri, Nigeria',
    description: 'Appointed Director of CEED, the university\'s entrepreneurship and enterprise development centre (2020–February 2025).',
    type: 'leadership',
    order: 10,
  },
  {
    year: 2024,
    title: 'Order of the Rising Sun, Gold and Silver Rays',
    organisation: 'Government of Japan',
    location: 'Japan',
    description:
      'Awarded the Order of the Rising Sun, Gold and Silver Rays by the Government of Japan ' +
      '(award year 2024; verify presentation ceremony date).',
    type: 'milestone',
    order: 11,
  },
  {
    year: 2025,
    title: 'Director, ASR-ICiE & Coordinator, UNDP UniPod',
    organisation: 'University of Maiduguri / UNDP',
    location: 'Maiduguri, Nigeria',
    description:
      'Appointed Director of the Abdul Samad Rabiu International Centre for Innovation and ' +
      'Entrepreneurship (ASR-ICiE) and Coordinator of the UNDP-supported UniPod (2025–present). ' +
      'Note: a focal-person role in UniPod preceded this formal appointment.',
    type: 'leadership',
    order: 12,
  },
]

// ─── Research Projects ────────────────────────────────────────────────────
// Source: CV and project records (§6 Flagship Project Page Outlines, 17 Nov 2026).
// Every public record must carry: role, dates, partners, stage, evidence, public summary,
// and owner approval before publication (per §7 database rules).
// Verify roles, dates, partners and outcomes before publishing.

export const SEED_RESEARCH: Omit3<ResearchProject>[] = [
  {
    title: 'Green Composites and Sustainable Materials',
    // §6 Flagship outline — website placement: Research portfolio: Green Composites
    description:
      'Challenge: improve materials sustainability using agricultural residues. ' +
      'Approach: process and evaluate natural-fibre (maize, bagasse) and recycled-polymer composites; ' +
      'characterise mechanical properties and environmental performance. ' +
      'Evidence: journal articles (2000–2007), 2006 Ecomaterials Handbook chapter, Japanese patent ' +
      'application publication JP2009138105 A. ' +
      'Status: historic research outputs; IP status pending verification — application publication ' +
      'does not establish patent grant.',
    fundingBody: 'Japanese Government Scholarship / JSPS / various',
    startYear: 2000,
    endYear: 2007,
    status: 'completed',
    collaborators: ['Tokyo Metropolitan University', 'Tokyo Industrial Research Institute (TIRI)'],
    keywords: ['green composites', 'natural fibres', 'maize', 'bagasse', 'recycled polypropylene', 'sustainability'],
    outcomes:
      'Multiple peer-reviewed publications (2000–2007); handbook chapter (2006); ' +
      'Japanese patent application JP2009138105 A filed (application publication — grant status to be verified).',
    featured: true,
  },
  {
    title: 'NASENI Advanced Manufacturing and Agro-processing (AMTDI)',
    // §6 Flagship outline — website placement: Engineering Technologies; NASENI Leadership
    description:
      'Challenge: build domestic engineering and product-development capacity. ' +
      'Approach: executive leadership at AMTDI Jalingo and engineering infrastructure development. ' +
      'Evidence: 2016 patent-related records (NG/P/2016/47, /48, /98, /99), technical and professional CV. ' +
      'Status: institutional technology portfolio; confirm product deployment and rights. ' +
      'Note: differentiate individual research authorship from NASENI team projects.',
    fundingBody: 'NASENI / Federal Ministry of Science and Technology (FMST)',
    startYear: 2010,
    endYear: 2019,
    status: 'completed',
    collaborators: ['NASENI', 'AMT-P Jalingo', 'FMST'],
    keywords: ['AMTDI', 'NASENI', 'agro-processing', 'manufacturing', 'rice thresher', 'fish dryer'],
    outcomes:
      'Development of agro-processing machinery (rice threshers, fish dryers, multi-grain threshers); ' +
      'engineering infrastructure established at AMTDI Jalingo; ' +
      'four patent-related records filed (2016) — original certificates and registry checks outstanding.',
    featured: true,
  },
  {
    title: 'Centre for Entrepreneurship and Enterprise Development (CEED)',
    description:
      'Professor Dauda served as Director of CEED at the University of Maiduguri from December 2020 ' +
      'to February 2025, overseeing entrepreneurship education, enterprise development programmes ' +
      'and skills initiatives aligned with the CEED leadership and ASR-ICiE/UniPod research-to-impact theme.',
    fundingBody: 'University of Maiduguri',
    startYear: 2020,
    endYear: 2025,
    status: 'completed',
    collaborators: ['University of Maiduguri'],
    keywords: ['CEED', 'entrepreneurship', 'enterprise development', 'engineering education', 'UNIMAID'],
    outcomes:
      'Entrepreneurship curriculum and skills programmes delivered; ' +
      'industry-academia linkage activities; ' +
      'directorship transitioned to ASR-ICiE, February 2025.',
    featured: false,
  },
  {
    title: 'ASR-ICiE and UNDP UniPod',
    // §6 Flagship outline — website placement: ASR-ICiE & UniPod
    description:
      'Challenge: translate university expertise into multidisciplinary innovation and enterprise opportunities. ' +
      'Approach: ASR-ICiE Centre leadership and UNDP UniPod coordination at the University of Maiduguri. ' +
      'Evidence: institutional appointment records and programme documents. ' +
      'Status: ongoing institutional programme; describe partnerships accurately and verify launch ' +
      'milestones and beneficiary numbers before quoting outcomes.',
    fundingBody: 'ASR Foundation / UNDP / University of Maiduguri',
    startYear: 2025,
    status: 'ongoing',
    collaborators: ['University of Maiduguri', 'ASR Foundation', 'UNDP'],
    keywords: ['ASR-ICiE', 'UniPod', 'UNDP', 'innovation', 'entrepreneurship', 'university', 'youth'],
    outcomes:
      'Multidisciplinary innovation, prototyping and enterprise opportunities for young Nigerians and Africans. ' +
      'Verify cohort outcomes and partner numbers before publishing.',
    featured: true,
  },
  {
    title: 'MCRP Fish Dryer Research Prototype',
    // §6 Flagship outline — website placement: Flagship Project: Fish Dryer Research
    description:
      'Challenge: improve fish processing compared with the traditional half-drum kiln. ' +
      'Approach: indirect combustion heating, insulated drying chamber, solar-powered forced-air ' +
      'circulation and alternative fuel trials. ' +
      'Evidence: prototype photographs, preliminary comparative tests and research fair application. ' +
      'Status: research prototype; validation and independent testing ongoing/proposed. ' +
      'IMPORTANT: This is a separate, later university prototype — not the same invention as the ' +
      'NASENI AMT-P patent entries (NG/P/2016/48, /98) without a documented technical and legal link.',
    fundingBody: 'MCRP (verify funder name and full title)',
    startYear: 2023,
    status: 'ongoing',
    collaborators: [],
    keywords: ['fish dryer', 'solar', 'agro-processing', 'post-harvest', 'indirect combustion', 'MCRP'],
    outcomes:
      'Prototype built; preliminary comparative tests against half-drum kiln conducted; ' +
      'solar-powered forced-air circulation trialled; ' +
      'further independent validation ongoing. Research fair application submitted.',
    featured: true,
  },
  {
    title: 'TETFund Mobile STEM School',
    // §6 Flagship outline — website placement: Innovation Leadership; Skills Development
    description:
      'Challenge: reach out-of-school and underserved learners with practical STEM exposure. ' +
      'Approach: principal investigator and implementation leadership for a mobile, community-facing ' +
      'STEM outreach programme. ' +
      'Evidence: TETFund award and implementation documents. ' +
      'Status: funded project under implementation; verify actual beneficiaries before quoting outcomes.',
    fundingBody: 'Tertiary Education Trust Fund (TETFund)',
    startYear: 2022,
    status: 'ongoing',
    collaborators: ['University of Maiduguri', 'TETFund'],
    keywords: ['STEM', 'Mobile STEM', 'TETFund', 'outreach', 'education', 'Nigeria'],
    outcomes:
      'Funded project under implementation. Verify actual beneficiary count from approved records before publishing.',
    featured: false,
  },
]

// ─── Awards ───────────────────────────────────────────────────────────────
// Source: CV 2025 — verify exact award years, presentation dates and issuing body documentation.

export const SEED_AWARDS: Omit3<Award>[] = [
  {
    title: 'Order of the Rising Sun, Gold and Silver Rays',
    organisation: 'Government of Japan',
    year: 2024,
    category: 'international',
    description:
      'Awarded by the Government of Japan in 2024. ' +
      'Verify the presentation ceremony date — the award year and the ceremony date may differ.',
  },
  {
    title: 'Fellow of the Nigerian Society of Engineers (FNSE)',
    organisation: 'Nigerian Society of Engineers (NSE)',
    year: 2010, // verify exact year from fellowship certificate
    category: 'fellowship',
    description:
      'Fellowship of the Nigerian Society of Engineers in recognition of contributions to ' +
      'mechanical engineering practice, research, and education in Nigeria.',
  },
  {
    title: 'Fellow of the Nigerian Institution of Mechanical Engineers (FNIMechE)',
    organisation: 'Nigerian Institution of Mechanical Engineers (NIMechE)',
    year: 2011, // verify exact year
    category: 'fellowship',
    description:
      'Fellowship awarded for distinguished contributions to mechanical engineering research, ' +
      'practice, and institutional development in Nigeria.',
  },
]

// ─── Publications ─────────────────────────────────────────────────────────
// Source: CV 2025 and Publications etc. document — 17 Nov 2026.
// STATUS: CV-reported. Not independently verified against publisher records.
// Content policy: use only records with at least a reliable original document or independently
// verified publisher/registry metadata. Mark others "under verification" in the private dashboard.
// Show full author order; do not duplicate conference papers as journal articles.
// Keep thesis, chapter, edited volume and manuscript categories separate.
// The 2026 Mechatronics textbook is a manuscript until a publication record is available.
//
// Key notes:
//  • Journals #1 and #2 (2024): nonstandard DOI strings — do not render as functional links.
//  • Journal #4 (2018): malformed DOI URL — verify against publisher.
//  • Journal #13 (2013): page range "2319–1805" resembles an ISSN, not page numbers — verify.
//  • Conference #7 (2015): co-author name conflict (Ashafa M.S. vs Shehu M.A.) — verify original.
//  • Conference #10 (2014): author list reconciliation required — Dauda is NOT sole author.

export const SEED_PUBLICATIONS: Omit3<Publication>[] = [

  // ── Journal Articles (26) ─────────────────────────────────────────────
  // All entries CV-reported. ISSN and conference dates added from the
  // Publications & Patents Register (17 Nov 2026).
  // Entries marked PENDING must not be published without owner approval.

  // J1 — 2024  ISSN 2360-9194  |  DOI nonstandard — do NOT render as link
  {
    title: "Investigating Phytochemical Properties of Camel's Foot (Pilostigma Reticulum) Plant Parts Extracts for Corrosion Inhibition",
    authors: 'Mamza, J. S., Dauda, M., Mshelia, Z. A. and Bulama, U.',
    journal: 'International Journal of Information, Engineering and Technology',
    volume: '12',
    issue: '7',
    pages: '51-61',
    year: 2024,
    type: 'journal',
    featured: false,
    // ISSN: 2360-9194 | DOI in CV: 4272-1454-381-1277 (nonstandard string — not a valid DOI)
    // verificationStatus: PENDING — check DOI, pagination and publisher record before publishing
    abstract: "Investigates phytochemical properties of Camel's Foot (Pilostigma Reticulum) plant parts extracts for corrosion inhibition.",
  },

  // J2 — 2024  ISSN 5741-2605  |  DOI nonstandard — do NOT render as link
  {
    title: 'Characterization of Diatomite from Bularafa in Gulani Local Government Area of Yobe State, Nigeria',
    authors: 'Adam, M. K., Dauda, M. and Hammajam, A. A.',
    journal: 'International Academic Journal of Information, Communication, Technology and Engineering',
    volume: '8',
    issue: '6',
    pages: '14-20',
    year: 2024,
    type: 'journal',
    featured: false,
    // ISSN: 5741-2605 | DOI in CV: 222-3942-8342-542-863 (nonstandard string — not a valid DOI)
    // verificationStatus: PENDING — check DOI, pagination and publisher record before publishing
    abstract: 'Characterizes diatomite mineral samples from Bularafa, Gulani LGA, Yobe State, Nigeria.',
  },

  // J3 — 2020
  {
    title: 'Development of a Laboratory-Size Single Toggle Jaw Crusher For Artisanal Miners and Stone Workers',
    authors: 'Okechukwu, C., Dahunsi, O. A., Oke, P. K., Oladele, I. O., Dauda, M.',
    journal: 'Arid Zone Journal of Engineering, Technology and Environment (AZOJETE)',
    volume: '16',
    issue: '3',
    pages: '449-474',
    year: 2020,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Design, development, and performance evaluation of a laboratory-size single toggle jaw crusher for artisanal miners.',
  },

  // J4 — 2018  |  PENDING: malformed DOI URL in CV — verify against publisher
  {
    title: 'Development of Ferro-Alloy Hardfacing for High Abrasion and Low Impact Wear Applications',
    authors: 'Okechukwu, C., Dahunsi, O. A., Oke, P. K., Oladele, I. O., Dauda, M.',
    journal: 'Metallurgical and Materials Engineering - Association of Metallurgical Engineers of Serbia (AMES)',
    pages: '71-81',
    year: 2018,
    type: 'journal',
    featured: false,
    doi: '10.30544/388',
    // CV lists malformed URL "http://doi.10.30544/388" — verify correct DOI against publisher
    // verificationStatus: PENDING — verify DOI before publishing
    abstract: 'Development and characterisation of ferro-alloy hardfacing materials for high-abrasion and low-impact wear applications.',
  },

  // J5 — 2018
  {
    title: 'Development of Hardfaced Crusher Jaws Using Ferro-alloys Hardfacing Inserts and Low Carbon Steel Substrate',
    authors: 'Okechukwu, C., Dahunsi, O. A., Oke, P. K., Oladele, I. O., Dauda, M.',
    journal: 'Journal Tribologi',
    volume: '18',
    pages: '20-39',
    year: 2018,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Development of hardfaced crusher jaws using ferro-alloy hardfacing inserts deposited on a low carbon steel substrate.',
  },

  // J6 — 2017
  {
    title: 'Design and Operations Challenges of a Single Toggle Jaw Crusher: A Review',
    authors: 'Okechukwu, C., Dahunsi, O., Oke, P. K., Oladele, I. O., Dauda, M., Olaleye, M.',
    journal: 'Nigerian Journal of Technology (NIJOTECH)',
    volume: '36',
    issue: '3',
    pages: '814-821',
    year: 2017,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'A comprehensive review of design principles and operational challenges of single toggle jaw crushers.',
  },

  // J7 — 2017
  {
    title: 'Material Recovery from Wastes: An Employment and Poverty Alleviation Tool',
    authors: 'Oumarou, M. B., Kundiri, A., and Dauda, M.',
    journal: 'Arid Zone Journal of Engineering, Technology and Environment',
    volume: '13',
    issue: '1',
    pages: '66-77',
    year: 2017,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Examines material recovery from waste streams as a strategy for employment creation and poverty alleviation in northern Nigeria.',
  },

  // J8 — 2017
  {
    title: 'Prominence of Hadfield Steel in Mining and Minerals Industries: A Review',
    authors: 'Okechukwu, C., Dahunsi, O., Oke, P. K., Oladele, I. O., Dauda, M.',
    journal: 'International Journal of Engineering Technologies (IJET)',
    volume: '3',
    issue: '2',
    pages: '83-90',
    year: 2017,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Reviews the metallurgical properties and applications of Hadfield steel in mining and minerals processing industries.',
  },

  // J9 — 2014
  {
    title: 'Performance Evaluation of an Automated Gari Fryer',
    authors: 'Olagoke, O. A., Olawale, J. O. and Dauda, M.',
    journal: 'The International Journal of Engineering and Science (IJES)',
    volume: '3',
    issue: '2',
    pages: '39-46',
    year: 2014,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Performance evaluation of an automated gari fryer designed to reduce labour intensity and improve quality in gari production.',
  },

  // J10 — 2014
  {
    title: 'Development of Large Diameter V-Belt Pulley Using Coreless Drag and Wire-Reinforced Cheek',
    authors: 'Okechukwu, C., Dauda, M., Dahunsi, O. A., Oke, P. K.',
    journal: 'International Journal of Applied Science and Engineering Research',
    volume: '3',
    issue: '5',
    pages: '1012-1020',
    year: 2014,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Novel foundry method for producing large-diameter v-belt pulleys using coreless drag and wire-reinforced cheek technology.',
  },

  // J11 — 2013
  {
    title: 'Design and Development of an Engine-Driven Blower for Charcoal Furnaces',
    authors: 'Okechukwu, C., Dauda, M., Enebe, K. O., Oloyede, O. T. and Nwagu, M. U.',
    journal: 'The International Journal of Engineering and Science (IJES)',
    volume: '2',
    issue: '10',
    pages: '74-79',
    year: 2013,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Design, fabrication, and performance testing of an engine-driven blower system for charcoal furnaces in small foundries.',
  },

  // J12 — 2013
  {
    title: 'Development of a Diameter Model for the Determination of the Equivalent Lengths of Composite Shafts',
    authors: 'Dauda, M. and Okechukwu, C.',
    journal: 'The International Journal of Engineering and Science (IJES)',
    volume: '2',
    issue: '9',
    pages: '46-51',
    year: 2013,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Derives and validates a diameter model for calculating equivalent lengths of stepped composite shafts in mechanical design.',
  },

  // J13 — 2013  |  PENDING: page range resembles ISSN — verify original publication
  {
    title: 'Production of a V-Belt Pulley Using Segmented Pattern',
    authors: 'Dauda, M. and Okechukwu, C.',
    journal: 'The International Journal of Engineering and Science (IJES)',
    volume: '2',
    issue: '8',
    pages: '2319-1805',
    year: 2013,
    type: 'journal',
    featured: false,
    // Page range "2319-1805" in CV resembles ISSN 2319-1805 — verify actual page numbers
    // verificationStatus: PENDING — verify pagination before publishing
    abstract: 'Describes a segmented-pattern casting technique for the production of v-belt pulleys.',
  },

  // J14 — 2012
  {
    title: 'Enhancing Students Learning Through Innovative Teaching',
    authors: 'Dauda, M.',
    journal: 'Publications of the International Centre for Mathematical and Computer Sciences (ICMCS)',
    volume: '5',
    pages: '45-48',
    year: 2012,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Examines innovative pedagogical approaches for improving student learning outcomes in engineering courses.',
  },

  // J15 — 2012
  {
    title: 'Characterization and Generation of Municipal Solid Waste in North Central Nigeria',
    authors: 'Oumarou, M. B., Dauda, M., Suleiman, A. T., and Abubakar, A. B.',
    journal: 'International Journal of Modern Engineering Research (IJMER)',
    volume: '2',
    issue: '5',
    pages: '3669-3672',
    year: 2012,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Characterises the composition and generation rates of municipal solid waste in north central Nigerian cities.',
  },

  // J16 — year not explicitly stated in CV; assigned 2012 from list position — verify
  {
    title: 'Municipal Solid Waste Generation, Recovery and Recycling: A Case Study',
    authors: 'Oumarou, M. B., Dauda, M., and Suleiman, A. T.',
    journal: 'World Journal of Engineering and Pure and Applied Science',
    volume: '2',
    issue: '5',
    pages: '142-147',
    year: 2012,
    type: 'journal',
    featured: false,
    // Year not explicitly stated in CV — assigned 2012 from list context; confirm before publishing
    // verificationStatus: cv-reported — confirm year
    abstract: 'Case study examining municipal solid waste generation patterns, recovery rates, and recycling practices in northern Nigeria.',
  },

  // J17 — 2012
  {
    title: 'Modelling and Simulation of Low Calorific Value Municipal Solid Waste Incineration',
    authors: 'Oumarou, M. B., Abdulrahim, A. T., Dauda, M.',
    journal: 'World Journal of Engineering and Pure and Applied Science',
    volume: '2',
    issue: '5',
    pages: '135-142',
    year: 2012,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Mathematical modelling and simulation of combustion performance for low calorific value municipal solid waste incinerators.',
  },

  // J18 — 2010
  {
    title: 'Effect of Cassava Peels on Biogas Production',
    authors: 'Oumarou, M. B., Dauda, M., and Omoha, M.',
    journal: 'International Journal of Engineering Science',
    volume: '2',
    issue: '3',
    pages: '84-95',
    year: 2010,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Investigates the effect of cassava peel substrate ratios on biogas yield and production rates in anaerobic digesters.',
  },

  // J19 — 2010
  {
    title: 'Design and Construction of High Concentration Solar Cooker',
    authors: 'Garba, G. M., Maina, M. B. and Dauda, M.',
    journal: 'Journal of Engineering, Science and Technology - Duncan Journal of Science',
    volume: '5',
    issue: '2',
    pages: '128-135',
    year: 2010,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Design, fabrication, and performance testing of a high-concentration solar cooker for community use in semi-arid regions.',
  },

  // J20 — 2010
  {
    title: 'Seasonal Variation in Dissolved Oxygen and Organic Pollution Indicators of Lake Chad Basin Area of Borno State, Nigeria',
    authors: 'Kolo, B. G., Ogugbuaja, V. O. and Dauda, M.',
    journal: 'Continental Journal of Water, Air and Soil Pollution I - Wilolud Journals',
    pages: '1-5',
    year: 2010,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Studies seasonal variation in dissolved oxygen levels and organic pollution indicators in Lake Chad basin water sources.',
  },

  // J21 — 2010
  {
    title: 'Study on the Level of Sulphates, Phosphates, and Nitrates in Water and Aqueous Sediments of Lake Chad Basin Area of Borno State, Nigeria',
    authors: 'Kolo, B. G., Ogugbuaja, V. O. and Dauda, M.',
    journal: 'Continental Journal of Water, Air and Soil Pollution I - Wilolud Journals',
    pages: '13-18',
    year: 2010,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Analyses concentrations of sulphates, phosphates, and nitrates in water and sediment samples from the Lake Chad basin.',
  },

  // J22 — 2007
  {
    title: 'Processing and Mechanical Property Evaluation of Maize Fiber Reinforced Green Composites',
    authors: 'Dauda, M., Yoshiba, M., Miura, K. and Takahashi, S.',
    journal: 'Journal of Advanced Composite Materials',
    volume: '16',
    issue: '4',
    pages: '335-347',
    year: 2007,
    type: 'journal',
    featured: true,
    // verificationStatus: cv-reported
    abstract: 'Processing and mechanical property evaluation of green composite materials reinforced with maize natural fibres.',
  },

  // J23 — 2002
  {
    title: 'Processing and Mechanical Properties of Long Maize Fiber Composites Reinforced with Recycled Polypropylene Matrix',
    authors: 'Dauda, M. and Yoshiba, M.',
    journal: 'Transactions of the Materials Research Society of Japan',
    volume: '27',
    issue: '3',
    pages: '633-636',
    year: 2002,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Processing conditions and mechanical performance of long maize fibre composites using a recycled polypropylene matrix.',
  },

  // J24 — 2002
  {
    title: 'Processing and Mechanical Properties of Long Bagasse Fiber Composites Reinforced with Recycled Polypropylene Matrix',
    authors: 'Dauda, M. and Yoshiba, M.',
    journal: 'Transactions of the Materials Research Society of Japan',
    volume: '27',
    issue: '1',
    pages: '1-6',
    year: 2002,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Processing and mechanical property characterisation of long bagasse fibre composites with recycled polypropylene matrix.',
  },

  // J25 — 2001
  {
    title: 'Processing and Mechanical Properties of Long Maize Fiber Reinforced Polypropylene Composites',
    authors: 'Dauda, M. and Yoshiba, M.',
    journal: 'Transactions of the Materials Research Society of Japan',
    volume: '26',
    issue: '4',
    pages: '1083-1090',
    year: 2001,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Processing routes and mechanical properties of polypropylene composites reinforced with long maize natural fibres.',
  },

  // J26 — 2000
  {
    title: 'Rationalization of Materials and Thermal Recovery System for Non-woody Agricultural Wastes',
    authors: 'Yoshiba, M. and Dauda, M.',
    journal: 'Transactions of the Materials Research Society of Japan',
    volume: '25',
    issue: '3',
    pages: '685-688',
    year: 2000,
    type: 'journal',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Rationalised approach to materials and thermal energy recovery from non-woody agricultural waste streams.',
  },

  // ── Conference Proceedings and Workshop Papers (18) ───────────────────

  // C1 — 10-12 December 2019, Abuja
  {
    title: 'Evaluating Convolution Neural Network Optimization Algorithms for Classification of Cervical Cancer Macro Images',
    authors: 'Mustafa, S., Dauda, M.',
    conference: '16th International Conference on Electronics Computer and Computation (ICECCO), 10-12 December 2019, NTNU, Abuja, Nigeria',
    pages: '1-5',
    year: 2019,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Evaluates CNN optimisation algorithms for the automated classification of cervical cancer macro images.',
  },

  // C2 — 14-17 October 2019, Zaria
  {
    title: 'Evaluating GrabCut Algorithm for Cervical Cancer Lesion Segmentation',
    authors: 'Mustafa, S. and Dauda, M.',
    conference: 'IEEE Nigeria Computer Chapter 2019 International Conference, 14-17 October 2019, Ahmadu Bello University (ABU), Zaria, Nigeria',
    year: 2019,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Evaluates the GrabCut algorithm for automatic segmentation of cervical cancer lesion boundaries in clinical images.',
  },

  // C3 — 29-31 October 2017, Ota
  {
    title: 'Image Processing and SVM Classification for Melanoma Detection',
    authors: 'Mustafa, S., Dauda, M., Dauda, A. B.',
    conference: 'IEEE International Conference on Computing, Networking and Informatics (ICCNI 2017), 29-31 October 2017, Covenant University, Ota, Nigeria',
    pages: '1-5',
    year: 2017,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Image processing and SVM classification for the automated detection of melanoma from skin images.',
  },

  // C4 — 7-10 November 2017, Owerri
  {
    title: 'Modeling and Simulation for Product Development in Nigeria',
    authors: 'Anyaoku, C., Dauda, M., Mustafa, S., Samuel, K., Mejidi, S.',
    conference: 'IEEE NIGERCON 2017 International Conference, 7-10 November 2017, Federal University of Technology, Owerri, Nigeria',
    pages: '644-649',
    year: 2017,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Role of computer modelling and simulation in accelerating product development in the Nigerian engineering sector.',
  },

  // C5 — November 2015, Akure
  {
    title: 'High Performance Computing Infrastructure as a Key Enabler to Engineering Design',
    authors: 'Adeniyi, O. O., Dauda, M., Oyeniran, K., Haruna, M. S., and Samuel, K.',
    conference: 'NSE 2015 National Engineering Conference, Exhibition and Annual General Meeting, November 2015, Akure, Nigeria',
    pages: '1-5',
    year: 2015,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'High-performance computing as a critical enabling infrastructure for advanced engineering design and simulation.',
  },

  // C6 — November 2015, Akure
  {
    title: 'Challenges of Advanced Manufacturing Technology Adoption in Nigerian Small and Medium Enterprises',
    authors: 'Dauda, M. and Chukwudumebi, E.',
    conference: 'NSE 2015 National Engineering Conference, Exhibition and Annual General Meeting, November 2015, Akure, Nigeria',
    pages: '1-9',
    year: 2015,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Barriers and enablers to advanced manufacturing technology adoption in Nigerian SMEs.',
  },

  // C7 — August 2015, Minna  |  PENDING: authorship conflict
  {
    title: 'Enhanced Approach for Cyber Security Web Applications in Nigeria',
    authors: 'Mustafa, S., Dauda, M., Danlami, A. A., and Ashafa, M. S.',
    conference: '1st International Engineering Conference (IEC 2015), August 2015, Minna, Nigeria',
    pages: '1-6',
    year: 2015,
    type: 'conference',
    featured: false,
    // AUTHORSHIP CONFLICT: CV lists "Ashafa M. S." but another record lists "Shehu M. A."
    // verificationStatus: PENDING — resolve co-author name before publishing
    abstract: 'Enhanced security framework for web application protection in the Nigerian context.',
  },

  // C8 — 9-11 May 2015, Bali
  {
    title: 'Adoption and Implementation of Advanced Manufacturing Technology in Nigeria',
    authors: 'Dauda, M., Haruna, M. S., Bala, S.',
    conference: '6th International Conference on Material and Manufacturing Technology (ICMMT 2015), 9-11 May 2015, Bali, Indonesia',
    pages: '1-7',
    year: 2015,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Current state of advanced manufacturing technology adoption in Nigeria and an implementation framework.',
  },

  // C9 — 2014, Abuja
  {
    title: 'Classification of Cervical Cancer Tissues Using a Novel Low-Cost Methodology for Effective Screening in Rural Settings',
    authors: 'Mustafa, S., Adeshina, S., Dauda, M., and Soboyejo, W.',
    conference: '11th International Conference on Electronics Computer and Computation (ICECCO 2014), NTNU, Abuja, Nigeria',
    pages: '1-4',
    year: 2014,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Low-cost image classification methodology for cervical cancer tissue screening in rural healthcare settings.',
  },

  // C10 — 2014, Abuja  |  PENDING: author list reconciliation
  {
    title: 'Improving e-Government in Nigeria Through Effective Identity Management (idM) Approach',
    authors: 'Oyeniran, K., Haruna, M. S., Dauda, M. and Aloko, M.',
    conference: '11th International Conference on Electronics Computer and Computation (ICECCO 2014), NTNU, Abuja, Nigeria',
    pages: '66-69',
    year: 2014,
    type: 'conference',
    featured: false,
    // AUTHORSHIP NOTE: abbreviated CV incorrectly lists Dauda as sole author.
    // Four-author list from detailed CV is authoritative; verify against original proceedings.
    // verificationStatus: PENDING — confirm author list before publishing
    abstract: 'Identity management framework for improving e-government service delivery in Nigeria.',
  },

  // C11 — 5-7 September 2012, Oshogbo
  {
    title: 'Potentials for Primary Lead Production Using Locally Available Materials',
    authors: 'John, C. T. and Dauda, M.',
    conference: 'NSE Annual Conference and AGM, Metallurgical, Mining and Materials Division, 5-7 September 2012, Oshogbo, Nigeria',
    pages: '1-7',
    year: 2012,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Technical feasibility and resource availability for primary lead production using locally sourced Nigerian materials.',
  },

  // C12 — 2011, Philadelphia
  {
    title: 'Design and Mathematical Modelling of Low CV Municipal Solid Waste Incinerator',
    authors: 'Oumarou, M. B., Dauda, M., and Suleiman, A. T.',
    conference: '26th International Conference on Solid Waste Technology and Management, 2011, Philadelphia, USA',
    pages: '23-35',
    year: 2011,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Design criteria and mathematical combustion model for a municipal solid waste incinerator handling low calorific value waste.',
  },

  // C13 — 2011, Kaduna
  {
    title: 'Experimental Characterization of Municipal Solid Wastes for Energy Generation in Northeastern Nigeria',
    authors: 'Oumarou, M. B., Dauda, M., and Suleiman, A. T.',
    conference: '2nd National Water and Sanitation Conference, Kaduna, Nigeria',
    pages: '235-240',
    year: 2011,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Experimental characterisation of municipal solid wastes for energy generation in northeastern Nigerian cities.',
  },

  // C14 — 2007, Tokyo
  {
    title: 'Development and Property Evaluation of Maize Originated Green Composites',
    authors: 'Yoshiba, M., Dauda, M. and Takahashi, S.',
    conference: '10th Japan International SAMPE Symposium and Exhibition (JISSE-10), Tokyo Big Sight, Tokyo, Japan',
    pages: '1-6',
    year: 2007,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Development and property evaluation of green composite materials derived from maize natural fibres.',
  },

  // C15 — 2007, Tokyo  |  short communication originally in Japanese; English version available
  {
    title: 'Manufacturing and Property Evaluation of Green Composites Derived from Maize',
    authors: 'Dauda, M., Takahashi, S. and Yoshiba, M.',
    conference: 'Workshop on Frontier Materials, Tokyo Industrial Research Institute (TIRI), Tokyo, Japan',
    pages: '16',
    year: 2007,
    type: 'conference',
    featured: false,
    // Short communication originally in Japanese — English translated version available
    // verificationStatus: cv-reported
    abstract: 'Manufacturing and property evaluation of maize-derived green composites (short communication; English translation available).',
  },

  // C16 — 2006, Tokyo
  {
    title: 'Processing and Mechanical Property Evaluation of Maize Fiber Reinforced Green Composites',
    authors: 'Dauda, M., Yoshiba, M., Miura, K. and Takahashi, S.',
    conference: 'Fourth International Workshop on Green Composites (IWGC-4), Tokyo, Japan',
    pages: '86-91',
    year: 2006,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Processing optimisation and mechanical property characterisation of maize fibre reinforced green composites.',
  },

  // C17 — 2003, Abuja
  {
    title: 'Solid Waste Management and Re-use in Maiduguri, Nigeria',
    authors: 'Dauda, M. and Osita, O. O.',
    conference: '29th WEDC International Conference, Abuja, Nigeria',
    pages: '20-23',
    year: 2003,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Solid waste management practices and material re-use opportunities in Maiduguri, Borno State, Nigeria.',
  },

  // C18 — 24-26 May 2002, Chiba
  {
    title: 'Deep Drawing of Woven Natural Fiber-Thermoplastic Composites',
    authors: 'Manabe, K., Mita, K., Yamada, J., Dauda, M. and Yoshiba, M.',
    conference: '2002 Japanese Spring Conference for the Technology of Plasticity, 24-26 May 2002, Chiba, Japan',
    pages: '483-484',
    year: 2002,
    type: 'conference',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Deep drawing process parameters for woven natural fibre-thermoplastic composite materials.',
  },

  // ── Books and Book Chapters (2) ───────────────────────────────────────

  // B1 — 2016  Edited volume
  {
    title: 'Materials and Technologies for Sustainable Development',
    authors: 'Prof. Soboyejo, W., Dr. Dauda, M. et al. (Editors)',
    journal: 'Trans Tech Publications Ltd',
    year: 2016,
    type: 'book',
    featured: true,
    // verificationStatus: cv-reported — confirm full editor list
    abstract: 'Edited volume on materials science and engineering technologies for sustainable development. Published January 2016, USA.',
  },

  // B2 — 2006  Sub-chapter in Japanese
  {
    title: 'Natural Fiber and Biodegradable Polymer Composites',
    authors: 'Yoshiba, M. and Dauda, M.',
    journal: 'Ecomaterials Handbook, Maruzen Publishing Company',
    pages: '277-280',
    year: 2006,
    type: 'book_chapter',
    featured: false,
    // verificationStatus: cv-reported
    abstract: 'Sub-chapter on natural fibre and biodegradable polymer composites published in Japanese in the Ecomaterials Handbook, Tokyo, December 2006.',
  },

  // ── Unpublished Theses (3) — keep visibility private/draft ───────────

  // T1 — 1990  B.Eng.
  {
    title: 'Design for Construction of Solar Cooker',
    authors: 'Dauda, Mohammed',
    journal: 'B.Eng. Thesis, Department of Mechanical Engineering, University of Maiduguri',
    year: 1990,
    type: 'thesis',
    featured: false,
    // verificationStatus: cv-reported | visibility: private
    abstract: 'Bachelor of Engineering thesis on the design and construction of a solar cooker.',
  },

  // T2 — 1994  M.Sc.
  {
    title: 'Quality Engineering and Management in Nigerian Manufacturing Industries',
    authors: 'Dauda, Mohammed',
    journal: 'M.Sc. Thesis, Department of Mechanical Engineering, University of Lagos',
    year: 1994,
    type: 'thesis',
    featured: false,
    // verificationStatus: cv-reported | visibility: private
    abstract: 'Quality engineering and management practices in Nigerian manufacturing industries.',
  },

  // T3 — 2002  D.Eng.
  {
    title: 'Processing and Property Evaluation of Long Natural Fiber Reinforced Composites Through Recycling of Tropical Plant Wastes',
    authors: 'Dauda, Mohammed',
    journal: 'D.Eng. Thesis, Department of Mechanical Engineering, Tokyo Metropolitan University, Japan',
    year: 2002,
    type: 'thesis',
    featured: false,
    // verificationStatus: cv-reported | visibility: private
    abstract: 'Processing, characterisation, and property evaluation of long natural fibre reinforced composites from recycled tropical plant waste.',
  },
]

// ─── Patents ──────────────────────────────────────────────────────────────
// Source: CV 2025 and Publications etc. — 17 Nov 2026.
// STATUS: CV-reported documentary claims. RP numbers are NOT proof of granted/enforceable status.
// Action required: obtain original certificates or official registry extracts before publishing.
// Japanese record JP2009138105: kind code A = application publication, NOT a grant certificate.
// Suggested fields: title | inventors | applicant/assignee | jurisdiction |
// application number | publication number | grant number | filing/publication/grant dates |
// legal status | register URL | evidence attachment | visibility.

export const SEED_PATENTS: Omit3<Patent>[] = [
  {
    title: 'AMT-P Rice Threshing Machine',
    inventors: 'Dauda, M.; Bashir, Mohammed; Yusuf, Ilyasu; et al. (complete inventor list to be verified)',
    patentNumber: 'NG/P/2016/47',
    country: 'Nigeria',
    status: 'pending',
    year: 2016,
    // RP number is a documentary claim — confirm patent document, complete inventors, assignee and legal status
    description:
      'Rice threshing machine developed under the Advanced Manufacturing Technology Programme (AMT-P), ' +
      'NASENI Jalingo. Assignee: AMT-P Jalingo, NASENI, FMST. ' +
      'Status: CV-reported; original certificate and official registry extract required.',
  },
  {
    title: 'AMT-P Fish Dryer',
    inventors: 'Dauda, M.; Yusuf, Ilyasu; et al. (complete inventor list to be verified)',
    patentNumber: 'NG/P/2016/48',
    country: 'Nigeria',
    status: 'pending',
    year: 2016,
    description:
      'Fish dryer developed under the Advanced Manufacturing Technology Programme (AMT-P), NASENI Jalingo. ' +
      'Assignee: AMT-P Jalingo, NASENI, FMST. ' +
      'NOTE: This is an institutional NASENI record — do not conflate with the separate later MCRP fish dryer research prototype. ' +
      'Status: CV-reported; original certificate and official registry extract required.',
  },
  {
    title: 'AMT-P 20.0 JE Fish Dryer',
    inventors: 'Dauda, M.; Yusuf, Ilyasu; et al. (complete inventor list to be verified)',
    patentNumber: 'NG/P/2016/98',
    country: 'Nigeria',
    status: 'pending',
    year: 2016,
    description:
      'Fish dryer (20.0 JE model) developed under AMT-P, NASENI Jalingo. ' +
      'Assignee: AMT-P Jalingo, NASENI, FMST. ' +
      'NOTE: Distinct from the later MCRP research prototype. ' +
      'Status: CV-reported; original certificate and official registry extract required.',
  },
  {
    title: 'AMT-P Magami Multi-Grain Thresher',
    inventors: 'Dauda, M.; Yusuf, Ilyasu; et al. (complete inventor list to be verified)',
    patentNumber: 'NG/P/2016/99',
    country: 'Nigeria',
    status: 'pending',
    year: 2016,
    description:
      'Multi-grain thresher (Magami model) developed under AMT-P, NASENI Jalingo. ' +
      'Assignee: AMT-P Jalingo, NASENI, FMST. ' +
      'Status: CV-reported; original certificate and official registry extract required.',
  },
  {
    title: 'Composite Material and Method of Producing the Same',
    inventors: 'Yoshiba, Masayuki; Takahashi, Satoshi; Dauda, M.',
    patentNumber: 'JP2009138105',
    country: 'Japan',
    status: 'pending',
    year: 2009,
    description:
      'Japanese patent record for a composite material and its production method. ' +
      'Kind code A = publication of an application — NOT a grant certificate. ' +
      'Assignee: Tokyo Metropolitan University, TAMA TLO KK. ' +
      'Action required: confirm inventor order, assignee, any grant number, and current legal status via official register.',
  },
]

// ─── Mentorship Programmes ────────────────────────────────────────────────

export const SEED_MENTORSHIP: Omit3<MentorshipProgram>[] = [
  {
    title: 'Postgraduate Research Supervision',
    description:
      'Professor Dauda has supervised PhD and Masters students in mechanical engineering, materials science, ' +
      'and engineering entrepreneurship at the University of Maiduguri.',
    targetAudience: 'PhD and Masters students in engineering',
    outcomes: 'Graduates now hold academic, industry, and government positions across Nigeria.',
    active: true,
    order: 0,
  },
  {
    title: 'ASR-ICiE Engineering Entrepreneurship Programme',
    description:
      'Structured entrepreneurship programme through the Abdul Samad Rabiu International Centre for ' +
      'Innovation and Entrepreneurship (ASR-ICiE), training engineers to commercialise research and ' +
      'develop engineering ventures.',
    targetAudience: 'Engineering graduates and early-career professionals',
    outcomes: 'Innovation programme ongoing from 2025. Verify cohort outcomes before quoting numbers.',
    active: true,
    order: 1,
  },
  {
    title: 'UNDP UniPod — Young African Innovators',
    description:
      'The UNDP-supported UniPod programme coordinated by Professor Dauda brings together young African ' +
      'innovators to develop solutions aligned with sustainable development goals, with access to university ' +
      'labs, mentorship, and enterprise support.',
    targetAudience: 'Young African engineers and innovators',
    outcomes: 'Ongoing programme from 2025. Verify participant numbers and outcomes before publishing.',
    active: true,
    order: 2,
  },
  {
    title: 'Professional Engineering Development',
    description:
      'Informal and structured mentoring for junior engineers through NIMechE, NSE, and university networks, ' +
      'including career guidance workshops and professional development sessions.',
    targetAudience: 'Junior engineers seeking professional development and career guidance',
    outcomes: 'Engineers mentored through structured and informal sessions; verify figures from records.',
    active: true,
    order: 3,
  },
  {
    title: 'Consultancy and Collaboration',
    description:
      'Open to consultancy requests in mechanical engineering, manufacturing technology, agro-processing, ' +
      'green composites, and engineering entrepreneurship. Enquiries via the contact form.',
    targetAudience: 'Industry, government, and international organisations',
    outcomes: '',
    active: true,
    order: 4,
  },
]

// ─── Activities ───────────────────────────────────────────────────────────

export const SEED_ACTIVITIES: Omit3<Activity>[] = [
  {
    title: 'Director, ASR-ICiE — Appointment (2025)',
    slug: 'director-asr-icie-appointment-2025',
    summary:
      'Appointed Director of the Abdul Samad Rabiu International Centre for Innovation and Entrepreneurship ' +
      '(ASR-ICiE) at the University of Maiduguri in 2025.',
    report:
      '<p>Professor Mohammed Dauda was appointed Director of ASR-ICiE in 2025. The centre focuses on ' +
      'translating multidisciplinary university expertise into innovation and enterprise opportunities for ' +
      'young Nigerians and Africans. This appointment follows his role as Director of CEED (2020–February 2025).</p>',
    date: new Date('2025-01-01'),
    venue: 'University of Maiduguri',
    organisingInstitution: 'University of Maiduguri',
    category: 'other',
    status: 'published',
    featured: true,
    tags: ['ASR-ICiE', 'innovation', 'entrepreneurship', '2025'],
    relatedOrgs: ['University of Maiduguri', 'ASR Foundation'],
  },
  {
    title: 'Coordinator, UNDP UniPod — University of Maiduguri (2025)',
    slug: 'coordinator-undp-unipod-unimaid-2025',
    summary:
      'Appointed Coordinator of the UNDP-supported UniPod at the University of Maiduguri in 2025, ' +
      'supporting young innovators with labs, mentorship, and enterprise opportunities.',
    report:
      '<p>Professor Dauda was appointed Coordinator of the UNDP-supported UniPod at the University of Maiduguri ' +
      'in 2025. The UniPod supports young Nigerian and African innovators in developing SDG-aligned solutions ' +
      'through access to university facilities, mentorship, and enterprise support networks. ' +
      'Note: a focal-person role in UniPod preceded this formal coordinator appointment.</p>',
    date: new Date('2025-01-01'),
    venue: 'University of Maiduguri',
    organisingInstitution: 'UNDP / University of Maiduguri',
    category: 'other',
    status: 'published',
    featured: true,
    tags: ['UniPod', 'UNDP', 'innovation', '2025'],
    relatedOrgs: ['UNDP', 'University of Maiduguri'],
  },
  {
    title: 'Order of the Rising Sun, Gold and Silver Rays — Japan (2024)',
    slug: 'order-of-rising-sun-gold-silver-rays-2024',
    summary:
      'Received the Order of the Rising Sun, Gold and Silver Rays from the Government of Japan in 2024.',
    report:
      '<p>Professor Mohammed Dauda received the Order of the Rising Sun, Gold and Silver Rays from the ' +
      'Government of Japan in 2024, in recognition of his contributions to materials research and ' +
      'Japan–Nigeria academic cooperation during his doctoral and postdoctoral research at Tokyo Metropolitan ' +
      'University. The award year is 2024; verify the presentation ceremony date.</p>',
    date: new Date('2024-01-01'),
    venue: 'Japan',
    organisingInstitution: 'Government of Japan',
    category: 'award_ceremony',
    status: 'published',
    featured: true,
    tags: ['Order of the Rising Sun', 'Japan', 'award', '2024'],
    relatedOrgs: ['Government of Japan', 'Tokyo Metropolitan University'],
  },
  {
    title: 'Director, CEED — University of Maiduguri (2020–2025)',
    slug: 'director-ceed-unimaid-2020-2025',
    summary:
      'Served as Director of the Centre for Entrepreneurship and Enterprise Development (CEED) at the ' +
      'University of Maiduguri from 2020 to February 2025.',
    report:
      '<p>Professor Dauda directed CEED from 2020 to February 2025, overseeing entrepreneurship education ' +
      'programmes, enterprise development initiatives, and skills development engagements at the ' +
      'University of Maiduguri.</p>',
    date: new Date('2020-01-01'),
    venue: 'University of Maiduguri',
    organisingInstitution: 'University of Maiduguri',
    category: 'other',
    status: 'published',
    featured: false,
    tags: ['CEED', 'entrepreneurship', 'UNIMAID', '2020'],
    relatedOrgs: ['University of Maiduguri'],
  },
]

// ─── News Items ───────────────────────────────────────────────────────────

export const SEED_NEWS: Omit3<NewsItem>[] = [
  {
    title: 'Prof. Dauda Appointed Director of ASR-ICiE (2025)',
    slug: 'prof-dauda-appointed-director-asr-icie-2025',
    excerpt:
      'Professor Mohammed Dauda takes up the role of Director of the Abdul Samad Rabiu International ' +
      'Centre for Innovation and Entrepreneurship (ASR-ICiE) at the University of Maiduguri.',
    body:
      '<p>Professor Mohammed Dauda was appointed Director of ASR-ICiE in 2025, succeeding his earlier ' +
      'role as Director of CEED. The centre focuses on translating multidisciplinary university expertise ' +
      'into innovation and enterprise opportunities for young Nigerians and Africans.</p>' +
      '<p>He also serves as Coordinator of the UNDP-supported UniPod at the University of Maiduguri — ' +
      'providing access to labs, mentorship, and enterprise support for young innovators.</p>',
    published: true,
    publishedAt: new Date('2025-01-01'),
    author: 'Admin',
    tags: ['ASR-ICiE', 'UniPod', 'appointment', '2025'],
  },
  {
    title: 'Order of the Rising Sun Awarded to Prof. Dauda by the Government of Japan (2024)',
    slug: 'order-rising-sun-gold-silver-rays-2024',
    excerpt:
      'The Government of Japan honoured Professor Mohammed Dauda with the Order of the Rising Sun, ' +
      'Gold and Silver Rays, in recognition of his contributions to materials research and bilateral academic cooperation.',
    body:
      '<p>Professor Mohammed Dauda received the Order of the Rising Sun, Gold and Silver Rays from the ' +
      'Government of Japan in 2024. The award recognises his contributions to natural-fibre composite materials ' +
      'research conducted at Tokyo Metropolitan University and to Japan–Nigeria academic cooperation.</p>' +
      '<p>Professor Dauda earned his D.Eng. from Tokyo Metropolitan University in 2002 and held a JSPS ' +
      'postdoctoral fellowship in Japan from 2005 to 2007. Verify the presentation ceremony date before ' +
      'publishing the full citation.</p>',
    published: true,
    publishedAt: new Date('2024-06-01'),
    author: 'Admin',
    tags: ['Order of the Rising Sun', 'Japan', 'award', '2024'],
  },
  {
    title: 'TETFund Mobile STEM School — Project Under Implementation',
    slug: 'tetfund-mobile-stem-school-implementation',
    excerpt:
      'Professor Dauda leads the TETFund-funded Mobile STEM School as principal investigator, bringing ' +
      'hands-on STEM exposure to out-of-school and underserved learners.',
    body:
      '<p>The TETFund Mobile STEM School, with Professor Mohammed Dauda as principal investigator, is currently ' +
      'under implementation. The project aims to reach out-of-school and underserved learners with practical ' +
      'science, technology, engineering, and mathematics experiences.</p>' +
      '<p>Verify actual beneficiary counts and implementation milestones from approved project records ' +
      'before quoting specific numbers publicly.</p>',
    published: false, // keep as draft until verified beneficiary figures are available
    publishedAt: new Date('2024-01-01'),
    author: 'Admin',
    tags: ['TETFund', 'STEM', 'Mobile STEM School', 'education'],
  },
]
