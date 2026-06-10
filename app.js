/* ============================================================
   PalmX — app.js
   ============================================================ */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isSmallScreen = window.innerWidth < 640;

  /* ============================================================
     0. INTERNATIONALIZATION (EN / AR / ZH / ES)
     ============================================================ */
  const I18N = {
    en: {
      'nav.cap':`Capabilities`,'nav.show':`Showcase`,'nav.ops':`Operations`,'nav.approach':`Approach`,'nav.contact':`Contact`,'nav.cta':`Get in touch`,
      'hero.status':`SECURE BY DESIGN — JEDDAH / GLOBAL`,'hero.t1':`Engineered`,'hero.t2':`intelligence`,'hero.t3':`Built secure.`,
      'hero.sub':`PalmX is a penetration testing, AI, and software engineering firm — building and breaking the systems that organizations can't afford to get wrong.`,
      'hero.cta1':`Start a project`,'hero.cta2':`View capabilities`,
      'strip.l1':`Penetration testing`,'strip.l2':`AI development & testing`,'strip.l3':`Software engineering`,'strip.l4':`Jeddah · Operating globally`,
      'cap.eyebrow':`Capabilities — 001`,'cap.title':`Three disciplines.<br /><em>One stack.</em>`,
      'cap.meta':`We don't sell services in silos. Penetration testing, AI, and engineering are designed as one operating system — because the systems we build for clients have to be.`,
      'p1.title':`<em>Penetration</em><br />testing`,'p1.desc':`We attack your stack the way real adversaries do — methodical, patient, evidence-driven. Then hand you the playbook to close every gap we found.`,
      'p1.li1':`External & internal network`,'p1.li2':`Web & mobile application`,'p1.li3':`Cloud, API, & infrastructure`,'p1.li4':`Red team & social engineering`,'p1.li5':`Wireless & physical assessments`,
      'p2.title':`AI development<br />& <em>testing</em>`,'p2.desc':`We build AI that ships into production — and we red-team the ones you've already shipped. Capability and safety, on the same team.`,
      'p2.li1':`LLM agents & RAG pipelines`,'p2.li2':`Custom model fine-tuning`,'p2.li3':`AI red-teaming & jailbreak audits`,'p2.li4':`Eval harnesses & benchmarks`,'p2.li5':`Private deployment & MLOps`,
      'p3.title':`<em>Software</em><br />engineering`,'p3.desc':`Full-stack product engineering — architecture to launch. Web, mobile, and backend systems built secure-by-default and engineered to last.`,
      'p3.li1':`Web & mobile applications`,'p3.li2':`API & platform engineering`,'p3.li3':`Cloud-native infrastructure`,'p3.li4':`Secure SDLC integration`,'p3.li5':`DevOps & site reliability`,
      'show.eyebrow':`Showcase — 002`,'show.title':`Watch the <em>discipline</em><br />switch.`,'show.meta':`An interactive look at how each capability changes the shape of what we build. Tap a discipline — or let it cycle.`,
      'show.t1':`Penetration testing`,'show.t2':`AI development & testing`,'show.t3':`Software engineering`,'show.cycle':`Auto-cycling — tap a tab to take control`,
      'show.pen.tag':`Offensive security`,'show.pen.title':`Find the gaps. <em>Close them.</em>`,'show.pen.body':`Methodical, evidence-driven testing across the surfaces that matter — networks, applications, cloud, and people. We don't ship reports; we ship reproducible findings your engineers can fix the same day.`,'show.pen.tags':[`Reproducible proofs`,`Remediation playbook`,`Retest included`],
      'show.ai.tag':`Applied intelligence`,'show.ai.title':`Models that <em>ship</em>. And hold.`,'show.ai.body':`We design, build, and red-team AI systems — from RAG pipelines and agents to bespoke fine-tunes. Every model gets an eval harness; every deployment gets a safety review. Capability and trust, in the same release.`,'show.ai.tags':[`Eval harness`,`Safety review`,`Production-ready`],
      'show.sw.tag':`Product engineering`,'show.sw.title':`Shipped. <em>Maintained.</em> Trusted.`,'show.sw.body':`Full-stack engineering across web, mobile, and backend — designed secure-by-default, instrumented from day one, and built to outlast the brief. We don't hand over a repo and disappear.`,'show.sw.tags':[`Secure by default`,`Documented`,`Maintained`],
      'ops.eyebrow':`Operations — 003`,'ops.heading':`The way we <em>actually</em> work.`,'ops.lead':`Every engagement — pentest, AI build, or product engineering — is operator-led: scoped against your real threat model, executed under signed rules of engagement, and delivered as a debrief.`,
      'ops.f1s':`Operator-led, never templated`,'ops.f1b':`Senior engineers on every engagement — no junior labor disguised as methodology.`,'ops.f2s':`Evidence-first delivery`,'ops.f2b':`Reproducible proofs, working code, mapped to your stack — verifiable the same day.`,'ops.f3s':`Follow-through included`,'ops.f3b':`Retest, post-launch support, model retraining — built into the engagement, not the renewal.`,
      'appr.eyebrow':`Approach — 004`,'appr.title':`No theatre.<br /><em>Just the work.</em>`,'appr.meta':`We'd rather show you how we operate than quote a number you can't verify. These are the commitments every engagement is held to.`,
      'appr.1t':`Scoped to your real threat model`,'appr.1b':`No copy-paste checklists. We start from what an actual adversary — or an actual user — would do to your specific system, and test that.`,
      'appr.2t':`Evidence you can reproduce`,'appr.2b':`Every finding ships with the steps to reproduce it and the code to fix it. If your engineers can't verify it the same day, it isn't done.`,
      'appr.3t':`Confidentiality by default`,'appr.3b':`Signed rules of engagement, least-privilege access, and a clean teardown. What we learn about your systems stays between us.`,
      'appr.4t':`We stay until it holds`,'appr.4b':`Retest, post-launch support, and model retraining are part of the engagement — not a separate invoice when something breaks.`,
      'cta.title':`Tell us what's<br /><em>at stake</em>.`,'cta.sub':`Whether you need to break a system before someone else does, ship an AI you can trust in production, or build a product that won't embarrass you in a year — start with a conversation.`,'cta.book':`Book a discovery call`,
      'modal.eyebrow':`Discovery call`,'modal.title':`Let's talk.`,'modal.sub':`Call us directly — we'll scope your engagement on the spot.`,'modal.callnow':`Call now`,'modal.copy':`Copy number`,
      'footer.brand':`Penetration testing, AI development & testing, and software engineering — for organizations that operate where precision matters.`,'footer.h1':`Capabilities`,'footer.c1':`Penetration testing`,'footer.c2':`AI development`,'footer.c3':`AI testing`,'footer.c4':`Software engineering`,'footer.h2':`Contact`,'footer.loc':`Jeddah, KSA`,'footer.bottom':`Engineered in Jeddah / Operated globally`
    },
    ar: {
      'nav.cap':`القدرات`,'nav.show':`استعراض`,'nav.ops':`آلية العمل`,'nav.approach':`منهجيتنا`,'nav.contact':`التواصل`,'nav.cta':`تواصل معنا`,
      'hero.status':`مؤمَّن بالتصميم — جدة / عالمياً`,'hero.t1':`ذكاءٌ`,'hero.t2':`مُهندَس`,'hero.t3':`وآمنٌ بالتصميم.`,
      'hero.sub':`«PalmX» شركةٌ متخصصة في اختبار الاختراق والذكاء الاصطناعي وهندسة البرمجيات — نبني الأنظمة التي لا تحتمل المؤسسات وقوع خطأ فيها، ونخترقها قبل أن يفعل ذلك سوانا.`,
      'hero.cta1':`ابدأ مشروعك`,'hero.cta2':`استعرض القدرات`,
      'strip.l1':`اختبار الاختراق`,'strip.l2':`تطوير واختبار الذكاء الاصطناعي`,'strip.l3':`هندسة البرمجيات`,'strip.l4':`جدة · نعمل عالمياً`,
      'cap.eyebrow':`القدرات — 001`,'cap.title':`ثلاثة تخصّصات.<br /><em>منظومة واحدة.</em>`,
      'cap.meta':`لا نقدّم خدماتنا في صوامع منفصلة. اختبار الاختراق والذكاء الاصطناعي والهندسة مُصمَّمة كمنظومة تشغيل واحدة — لأن الأنظمة التي نبنيها لعملائنا يجب أن تكون كذلك.`,
      'p1.title':`اختبار<br /><em>الاختراق</em>`,'p1.desc':`نهاجم منظومتك بالأسلوب نفسه الذي يتّبعه المهاجمون الحقيقيون — بمنهجية وصبرٍ واعتمادٍ على الأدلة. ثم نسلّمك خطة عملٍ لإغلاق كل ثغرة نكتشفها.`,
      'p1.li1':`الشبكات الداخلية والخارجية`,'p1.li2':`تطبيقات الويب والجوال`,'p1.li3':`السحابة وواجهات البرمجة والبنية التحتية`,'p1.li4':`الفريق الأحمر والهندسة الاجتماعية`,'p1.li5':`التقييمات اللاسلكية والمادية`,
      'p2.title':`تطوير الذكاء الاصطناعي<br />و<em>اختباره</em>`,'p2.desc':`نبني ذكاءً اصطناعياً جاهزاً للإنتاج — ونختبر هجومياً ما سبق أن أطلقته. القدرة والأمان في فريقٍ واحد.`,
      'p2.li1':`وكلاء النماذج اللغوية وخطوط RAG`,'p2.li2':`الضبط الدقيق للنماذج المخصّصة`,'p2.li3':`الاختبار الهجومي وتدقيق كسر الحماية`,'p2.li4':`منصّات التقييم والاختبارات المرجعية`,'p2.li5':`النشر الخاص وعمليات التعلّم الآلي`,
      'p3.title':`هندسة<br /><em>البرمجيات</em>`,'p3.desc':`هندسة منتجات متكاملة — من البنية حتى الإطلاق. أنظمة ويب وجوال وخلفية مبنيّة آمنةً بطبيعتها ومصمّمة لتدوم.`,
      'p3.li1':`تطبيقات الويب والجوال`,'p3.li2':`هندسة واجهات البرمجة والمنصّات`,'p3.li3':`بنية تحتية سحابية الأصل`,'p3.li4':`دمج دورة تطوير آمنة`,'p3.li5':`DevOps وموثوقية الأنظمة`,
      'show.eyebrow':`استعراض — 002`,'show.title':`شاهد <em>التخصّص</em><br />يتبدّل.`,'show.meta':`نظرةٌ تفاعلية على كيفية تغيير كل قدرةٍ لِما نبنيه. اختر تخصصاً — أو دعه يتنقّل تلقائياً.`,
      'show.t1':`اختبار الاختراق`,'show.t2':`تطوير واختبار الذكاء الاصطناعي`,'show.t3':`هندسة البرمجيات`,'show.cycle':`تنقّل تلقائي — اضغط على تبويب للتحكّم`,
      'show.pen.tag':`الأمن الهجومي`,'show.pen.title':`اكشف الثغرات. <em>وأغلِقها.</em>`,'show.pen.body':`اختبارٌ منهجيٌّ قائمٌ على الأدلة عبر الأسطح التي تهمّ — الشبكات والتطبيقات والسحابة والأفراد. لا نسلّم تقارير فحسب؛ بل نتائج قابلة لإعادة الإنتاج يصلحها مهندسوك في اليوم نفسه.`,'show.pen.tags':[`أدلة قابلة لإعادة الإنتاج`,`خطة معالجة`,`إعادة اختبار مشمولة`],
      'show.ai.tag':`ذكاء تطبيقي`,'show.ai.title':`نماذج <em>تُطلَق</em>. وتصمد.`,'show.ai.body':`نصمّم أنظمة الذكاء الاصطناعي ونبنيها ونختبرها هجومياً — من خطوط RAG والوكلاء إلى النماذج المضبوطة خصيصاً. كل نموذجٍ يحظى بمنصّة تقييم، وكل نشرٍ يمرّ بمراجعة أمان. القدرة والثقة في إصدارٍ واحد.`,'show.ai.tags':[`منصّة تقييم`,`مراجعة أمان`,`جاهز للإنتاج`],
      'show.sw.tag':`هندسة المنتجات`,'show.sw.title':`مُطلَق. <em>ومُصان.</em> وموثوق.`,'show.sw.body':`هندسة متكاملة عبر الويب والجوال والخلفية — آمنةٌ بطبيعتها، ومُهيّأة للقياس منذ اليوم الأول، ومبنيّة لتتجاوز عمر المشروع. لا نسلّم المستودع ونختفي.`,'show.sw.tags':[`آمن بطبيعته`,`موثَّق`,`مُصان`],
      'ops.eyebrow':`آلية العمل — 003`,'ops.heading':`الطريقة التي نعمل بها <em>فعلاً</em>.`,'ops.lead':`كل تكليف — اختبار اختراق أو بناء ذكاء اصطناعي أو هندسة منتج — يقوده مشغّلٌ خبير: مُحدَّد النطاق وفق نموذج التهديد الحقيقي لديك، ومنفَّذ ضمن قواعد اشتباك موقّعة، ومُسلَّم على هيئة إحاطة.`,
      'ops.f1s':`يقوده خبراء، بلا قوالب جاهزة`,'ops.f1b':`مهندسون كبار في كل تكليف — لا عمالة مبتدئة متخفّية بزيّ المنهجية.`,'ops.f2s':`تسليمٌ قائمٌ على الأدلة`,'ops.f2b':`أدلة قابلة لإعادة الإنتاج، وشيفرة عاملة، مرتبطة بمنظومتك — قابلة للتحقق في اليوم نفسه.`,'ops.f3s':`متابعةٌ مشمولة`,'ops.f3b':`إعادة الاختبار والدعم بعد الإطلاق وإعادة تدريب النماذج — جزءٌ من التكليف، لا من التجديد.`,
      'appr.eyebrow':`منهجيتنا — 004`,'appr.title':`لا استعراض.<br /><em>بل عمل.</em>`,'appr.meta':`نُفضّل أن نُريك كيف نعمل على أن نسوق لك رقماً لا يمكنك التحقق منه. هذه هي الالتزامات التي يخضع لها كل تكليف.`,
      'appr.1t':`مُحدَّد وفق نموذج التهديد الحقيقي لديك`,'appr.1b':`لا قوائم تحقّق منسوخة. نبدأ مما قد يفعله مهاجمٌ حقيقي — أو مستخدمٌ حقيقي — بنظامك تحديداً، ونختبر ذلك.`,
      'appr.2t':`أدلةٌ يمكنك إعادة إنتاجها`,'appr.2b':`كل نتيجة تأتي بخطوات إعادة إنتاجها والشيفرة اللازمة لإصلاحها. وإن لم يستطع مهندسوك التحقق منها في اليوم نفسه، فهي غير مكتملة.`,
      'appr.3t':`السرّية افتراضياً`,'appr.3b':`قواعد اشتباك موقّعة، وصلاحياتٌ بأقل امتياز، وإزالةٌ نظيفة بعد الانتهاء. ما نعرفه عن أنظمتك يبقى بيننا.`,
      'appr.4t':`نبقى حتى يثبت النظام`,'appr.4b':`إعادة الاختبار والدعم بعد الإطلاق وإعادة تدريب النماذج جزءٌ من التكليف — لا فاتورة منفصلة عند حدوث عطل.`,
      'cta.title':`أخبِرنا بما هو<br /><em>على المحكّ</em>.`,'cta.sub':`سواء احتجت إلى اختراق نظامٍ قبل أن يفعل ذلك سواك، أو إطلاق ذكاء اصطناعي تثق به في الإنتاج، أو بناء منتجٍ لا يُحرجك بعد عام — ابدأ بمحادثة.`,'cta.book':`احجز مكالمة تعارف`,
      'modal.eyebrow':`مكالمة تعارف`,'modal.title':`لنتحدّث.`,'modal.sub':`اتصل بنا مباشرة — وسنحدّد نطاق تكليفك على الفور.`,'modal.callnow':`اتصل الآن`,'modal.copy':`نسخ الرقم`,
      'footer.brand':`اختبار اختراق، وتطوير واختبار ذكاء اصطناعي، وهندسة برمجيات — للمؤسسات التي تعمل حيث تُحدِث الدقّة فرقاً.`,'footer.h1':`القدرات`,'footer.c1':`اختبار الاختراق`,'footer.c2':`تطوير الذكاء الاصطناعي`,'footer.c3':`اختبار الذكاء الاصطناعي`,'footer.c4':`هندسة البرمجيات`,'footer.h2':`التواصل`,'footer.loc':`جدة، السعودية`,'footer.bottom':`هُندِس في جدة / يُشغَّل عالمياً`
    },
    zh: {
      'nav.cap':`能力`,'nav.show':`演示`,'nav.ops':`运作方式`,'nav.approach':`方法`,'nav.contact':`联系`,'nav.cta':`联系我们`,
      'hero.status':`安全源于设计 — 吉达 / 全球`,'hero.t1':`工程化的`,'hero.t2':`智能`,'hero.t3':`安全交付。`,
      'hero.sub':`PalmX 是一家渗透测试、人工智能与软件工程公司 —— 构建并攻破那些组织绝不容许出错的系统。`,
      'hero.cta1':`启动项目`,'hero.cta2':`查看能力`,
      'strip.l1':`渗透测试`,'strip.l2':`AI 开发与测试`,'strip.l3':`软件工程`,'strip.l4':`吉达 · 面向全球`,
      'cap.eyebrow':`能力 — 001`,'cap.title':`三大专业。<br /><em>一套体系。</em>`,
      'cap.meta':`我们不把服务割裂成孤岛。渗透测试、人工智能与工程被设计为同一套运行系统 —— 因为我们为客户构建的系统本就必须如此。`,
      'p1.title':`<em>渗透</em><br />测试`,'p1.desc':`我们以真实攻击者的方式攻击你的系统 —— 有条理、有耐心、以证据为本。随后交给你一份关闭每一处缺口的行动手册。`,
      'p1.li1':`外部与内部网络`,'p1.li2':`Web 与移动应用`,'p1.li3':`云、API 与基础设施`,'p1.li4':`红队与社会工程`,'p1.li5':`无线与物理评估`,
      'p2.title':`AI 开发<br />与<em>测试</em>`,'p2.desc':`我们构建可投入生产的 AI —— 也对你已上线的系统进行红队测试。能力与安全，出自同一支团队。`,
      'p2.li1':`LLM 智能体与 RAG 流水线`,'p2.li2':`定制模型微调`,'p2.li3':`AI 红队与越狱审计`,'p2.li4':`评测框架与基准`,'p2.li5':`私有化部署与 MLOps`,
      'p3.title':`<em>软件</em><br />工程`,'p3.desc':`全栈产品工程 —— 从架构到上线。Web、移动与后端系统，默认安全，为长期运行而打造。`,
      'p3.li1':`Web 与移动应用`,'p3.li2':`API 与平台工程`,'p3.li3':`云原生基础设施`,'p3.li4':`安全开发生命周期集成`,'p3.li5':`DevOps 与站点可靠性`,
      'show.eyebrow':`演示 — 002`,'show.title':`看<em>专业</em><br />切换。`,'show.meta':`以交互方式了解每项能力如何改变我们构建的形态。点选一个专业 —— 或让它自动轮播。`,
      'show.t1':`渗透测试`,'show.t2':`AI 开发与测试`,'show.t3':`软件工程`,'show.cycle':`自动轮播 —— 点选标签以接管`,
      'show.pen.tag':`攻击性安全`,'show.pen.title':`找出缺口。<em>逐一封堵。</em>`,'show.pen.body':`在真正重要的面 —— 网络、应用、云与人 —— 进行有条理、以证据为本的测试。我们交付的不是报告，而是你的工程师当天就能修复的可复现发现。`,'show.pen.tags':[`可复现证据`,`修复手册`,`含复测`],
      'show.ai.tag':`应用智能`,'show.ai.title':`能<em>上线</em>的模型。且稳得住。`,'show.ai.body':`我们设计、构建并红队测试 AI 系统 —— 从 RAG 流水线、智能体到定制微调。每个模型都配评测框架，每次部署都经安全评审。能力与可信，同一次发布。`,'show.ai.tags':[`评测框架`,`安全评审`,`可投产`],
      'show.sw.tag':`产品工程`,'show.sw.title':`已交付。<em>持续维护。</em>值得信赖。`,'show.sw.body':`横跨 Web、移动与后端的全栈工程 —— 默认安全，自第一天起即可观测，并为超越需求周期而打造。我们不会交完仓库就消失。`,'show.sw.tags':[`默认安全`,`文档齐备`,`持续维护`],
      'ops.eyebrow':`运作方式 — 003`,'ops.heading':`我们<em>真正</em>的工作方式。`,'ops.lead':`每一次合作 —— 渗透测试、AI 构建或产品工程 —— 都由资深操作者主导：依据你真实的威胁模型确定范围，在签署的交战规则下执行，并以汇报形式交付。`,
      'ops.f1s':`操作者主导，绝不套模板`,'ops.f1b':`每次合作都有资深工程师亲自参与 —— 没有以方法论为幌子的初级人力。`,'ops.f2s':`证据优先的交付`,'ops.f2b':`可复现的证据、可用的代码，并对应到你的技术栈 —— 当天即可验证。`,'ops.f3s':`含后续跟进`,'ops.f3b':`复测、上线后支持、模型再训练 —— 已包含在合作中，而非续约时另算。`,
      'appr.eyebrow':`方法 — 004`,'appr.title':`不作秀。<br /><em>只做事。</em>`,'appr.meta':`与其报一个你无法核实的数字，我们更愿意让你看到我们如何运作。以下是每次合作都恪守的承诺。`,
      'appr.1t':`依据你真实的威胁模型确定范围`,'appr.1b':`没有照搬的检查清单。我们从真实攻击者 —— 或真实用户 —— 会对你的具体系统做什么出发，并据此测试。`,
      'appr.2t':`可复现的证据`,'appr.2b':`每条发现都附带复现步骤与修复代码。若你的工程师当天无法验证，就还没完成。`,
      'appr.3t':`默认保密`,'appr.3b':`签署的交战规则、最小权限访问，以及干净的收尾。我们对你系统的了解，只留在你我之间。`,
      'appr.4t':`直到稳固才离开`,'appr.4b':`复测、上线后支持与模型再训练都是合作的一部分 —— 而不是出问题时另开的账单。`,
      'cta.title':`告诉我们<br /><em>事关什么</em>。`,'cta.sub':`无论你需要在他人之前攻破一个系统、上线一个可在生产中信赖的 AI，还是打造一个一年后不会让你难堪的产品 —— 都从一次对话开始。`,'cta.book':`预约沟通通话`,
      'modal.eyebrow':`沟通通话`,'modal.title':`聊聊吧。`,'modal.sub':`直接致电我们 —— 我们当场为你界定合作范围。`,'modal.callnow':`立即致电`,'modal.copy':`复制号码`,
      'footer.brand':`渗透测试、AI 开发与测试，以及软件工程 —— 为在精度至关重要之处运作的组织服务。`,'footer.h1':`能力`,'footer.c1':`渗透测试`,'footer.c2':`AI 开发`,'footer.c3':`AI 测试`,'footer.c4':`软件工程`,'footer.h2':`联系`,'footer.loc':`沙特阿拉伯，吉达`,'footer.bottom':`于吉达打造 / 面向全球运营`
    },
    es: {
      'nav.cap':`Capacidades`,'nav.show':`Demostración`,'nav.ops':`Operación`,'nav.approach':`Enfoque`,'nav.contact':`Contacto`,'nav.cta':`Contáctanos`,
      'hero.status':`SEGURO POR DISEÑO — YEDA / GLOBAL`,'hero.t1':`Inteligencia`,'hero.t2':`diseñada`,'hero.t3':`y segura.`,
      'hero.sub':`PalmX es una firma de pruebas de penetración, IA e ingeniería de software — construye y vulnera los sistemas en los que las organizaciones no pueden permitirse fallar.`,
      'hero.cta1':`Iniciar un proyecto`,'hero.cta2':`Ver capacidades`,
      'strip.l1':`Pruebas de penetración`,'strip.l2':`Desarrollo y pruebas de IA`,'strip.l3':`Ingeniería de software`,'strip.l4':`Yeda · Operando globalmente`,
      'cap.eyebrow':`Capacidades — 001`,'cap.title':`Tres disciplinas.<br /><em>Un solo stack.</em>`,
      'cap.meta':`No vendemos servicios en compartimentos estancos. Las pruebas de penetración, la IA y la ingeniería se diseñan como un único sistema operativo — porque los sistemas que construimos para los clientes deben serlo.`,
      'p1.title':`Pruebas de<br /><em>penetración</em>`,'p1.desc':`Atacamos tu stack como lo harían adversarios reales — metódicos, pacientes, guiados por evidencia. Luego te entregamos el plan para cerrar cada brecha que encontramos.`,
      'p1.li1':`Red interna y externa`,'p1.li2':`Aplicaciones web y móviles`,'p1.li3':`Nube, API e infraestructura`,'p1.li4':`Red team e ingeniería social`,'p1.li5':`Evaluaciones inalámbricas y físicas`,
      'p2.title':`Desarrollo y<br /><em>pruebas</em> de IA`,'p2.desc':`Construimos IA lista para producción — y hacemos red team a la que ya lanzaste. Capacidad y seguridad, en el mismo equipo.`,
      'p2.li1':`Agentes LLM y pipelines RAG`,'p2.li2':`Ajuste fino de modelos a medida`,'p2.li3':`Red teaming de IA y auditorías de jailbreak`,'p2.li4':`Marcos de evaluación y benchmarks`,'p2.li5':`Despliegue privado y MLOps`,
      'p3.title':`Ingeniería de<br /><em>software</em>`,'p3.desc':`Ingeniería de producto full-stack — de la arquitectura al lanzamiento. Sistemas web, móviles y backend, seguros por defecto y diseñados para durar.`,
      'p3.li1':`Aplicaciones web y móviles`,'p3.li2':`Ingeniería de API y plataformas`,'p3.li3':`Infraestructura nativa en la nube`,'p3.li4':`Integración de SDLC seguro`,'p3.li5':`DevOps y fiabilidad del sitio`,
      'show.eyebrow':`Demostración — 002`,'show.title':`Mira cambiar<br />la <em>disciplina</em>.`,'show.meta':`Una mirada interactiva a cómo cada capacidad cambia la forma de lo que construimos. Toca una disciplina — o deja que avance sola.`,
      'show.t1':`Pruebas de penetración`,'show.t2':`Desarrollo y pruebas de IA`,'show.t3':`Ingeniería de software`,'show.cycle':`Avance automático — toca una pestaña para tomar el control`,
      'show.pen.tag':`Seguridad ofensiva`,'show.pen.title':`Encuentra las brechas. <em>Ciérralas.</em>`,'show.pen.body':`Pruebas metódicas y guiadas por evidencia en las superficies que importan — redes, aplicaciones, nube y personas. No entregamos informes; entregamos hallazgos reproducibles que tus ingenieros pueden corregir el mismo día.`,'show.pen.tags':[`Pruebas reproducibles`,`Plan de remediación`,`Retest incluido`],
      'show.ai.tag':`Inteligencia aplicada`,'show.ai.title':`Modelos que <em>se lanzan</em>. Y aguantan.`,'show.ai.body':`Diseñamos, construimos y hacemos red team a sistemas de IA — desde pipelines RAG y agentes hasta ajustes a medida. Cada modelo lleva un marco de evaluación; cada despliegue, una revisión de seguridad. Capacidad y confianza, en el mismo lanzamiento.`,'show.ai.tags':[`Marco de evaluación`,`Revisión de seguridad`,`Listo para producción`],
      'show.sw.tag':`Ingeniería de producto`,'show.sw.title':`Entregado. <em>Mantenido.</em> Confiable.`,'show.sw.body':`Ingeniería full-stack en web, móvil y backend — seguro por defecto, instrumentado desde el primer día y construido para durar más que el encargo. No entregamos un repo y desaparecemos.`,'show.sw.tags':[`Seguro por defecto`,`Documentado`,`Mantenido`],
      'ops.eyebrow':`Operación — 003`,'ops.heading':`Cómo trabajamos <em>de verdad</em>.`,'ops.lead':`Cada encargo — pentest, desarrollo de IA o ingeniería de producto — lo lidera un operador: con alcance definido según tu modelo de amenazas real, ejecutado bajo reglas de enfrentamiento firmadas y entregado como informe.`,
      'ops.f1s':`Liderado por operadores, nunca con plantillas`,'ops.f1b':`Ingenieros sénior en cada encargo — sin mano de obra júnior disfrazada de metodología.`,'ops.f2s':`Entrega basada en evidencia`,'ops.f2b':`Pruebas reproducibles, código funcional, mapeado a tu stack — verificable el mismo día.`,'ops.f3s':`Seguimiento incluido`,'ops.f3b':`Retest, soporte posterior al lanzamiento y reentrenamiento de modelos — parte del encargo, no de la renovación.`,
      'appr.eyebrow':`Enfoque — 004`,'appr.title':`Sin teatro.<br /><em>Solo el trabajo.</em>`,'appr.meta':`Preferimos mostrarte cómo operamos antes que citar una cifra que no puedes verificar. Estos son los compromisos a los que se somete cada encargo.`,
      'appr.1t':`Ajustado a tu modelo de amenazas real`,'appr.1b':`Sin checklists copiados. Partimos de lo que un adversario real — o un usuario real — haría con tu sistema concreto, y eso probamos.`,
      'appr.2t':`Evidencia que puedes reproducir`,'appr.2b':`Cada hallazgo llega con los pasos para reproducirlo y el código para corregirlo. Si tus ingenieros no pueden verificarlo el mismo día, no está terminado.`,
      'appr.3t':`Confidencialidad por defecto`,'appr.3b':`Reglas de enfrentamiento firmadas, acceso de mínimo privilegio y un cierre limpio. Lo que aprendemos de tus sistemas queda entre nosotros.`,
      'appr.4t':`Nos quedamos hasta que aguante`,'appr.4b':`Retest, soporte posterior al lanzamiento y reentrenamiento de modelos son parte del encargo — no una factura aparte cuando algo falla.`,
      'cta.title':`Cuéntanos qué está<br /><em>en juego</em>.`,'cta.sub':`Ya sea que necesites vulnerar un sistema antes que otro lo haga, lanzar una IA en la que confíes en producción o construir un producto que no te avergüence en un año — empieza con una conversación.`,'cta.book':`Agenda una llamada`,
      'modal.eyebrow':`Llamada inicial`,'modal.title':`Hablemos.`,'modal.sub':`Llámanos directamente — definimos el alcance de tu encargo en el momento.`,'modal.callnow':`Llamar ahora`,'modal.copy':`Copiar número`,
      'footer.brand':`Pruebas de penetración, desarrollo y pruebas de IA e ingeniería de software — para organizaciones que operan donde la precisión importa.`,'footer.h1':`Capacidades`,'footer.c1':`Pruebas de penetración`,'footer.c2':`Desarrollo de IA`,'footer.c3':`Pruebas de IA`,'footer.c4':`Ingeniería de software`,'footer.h2':`Contacto`,'footer.loc':`Yeda, Arabia Saudita`,'footer.bottom':`Diseñado en Yeda / Operado globalmente`
    }
  };

  let currentLang = 'en';
  let refreshShowcase = null;
  function t(key) {
    const dict = I18N[currentLang] || I18N.en;
    let v = dict[key];
    if (v === undefined) v = I18N.en[key];
    return v;
  }
  function applyLang(lang) {
    if (!I18N[lang]) lang = 'en';
    currentLang = lang;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = t(el.getAttribute('data-i18n'));
      if (typeof v === 'string') el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = t(el.getAttribute('data-i18n-html'));
      if (typeof v === 'string') el.innerHTML = v;
    });
    const cur = document.getElementById('langCurrent');
    if (cur) cur.textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-option').forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
    if (typeof refreshShowcase === 'function') refreshShowcase();
    try { localStorage.setItem('palmx-lang', lang); } catch (e) {}
  }

  /* ============================================================
     1. BOOT SEQUENCE
     ============================================================ */
  const boot = document.getElementById('boot');
  const bootFill = document.getElementById('bootFill');
  const bootText = document.getElementById('bootText');

  if (boot) {
    requestAnimationFrame(() => {
      if (bootFill) bootFill.style.width = '100%';
    });

    const bootStates = ['INITIALIZING', 'LOADING MODULES', 'SYSTEMS ONLINE'];
    let bIdx = 0;
    const bootInterval = setInterval(() => {
      bIdx = (bIdx + 1) % bootStates.length;
      if (bootText) bootText.textContent = bootStates[bIdx];
      if (bIdx === bootStates.length - 1) clearInterval(bootInterval);
    }, 500);

    setTimeout(() => {
      boot.classList.add('hidden');
      setTimeout(() => boot.remove(), 700);
    }, prefersReducedMotion ? 300 : 1700);
  }

  /* ============================================================
     2. PARTICLE CONSTELLATION (WebGL-free canvas)
     ============================================================ */
  const canvas = document.getElementById('particles');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let particles = [];
    let mx = -9999, my = -9999;
    let w, h, dpr;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);

      const targetCount = isSmallScreen ? 35 : Math.min(80, Math.floor((w * h) / 22000));
      particles = [];
      for (let i = 0; i < targetCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.2 + 0.4
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    if (isFinePointer) {
      window.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
      });
      window.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });
    }

    const MAX_DIST = isSmallScreen ? 90 : 140;
    const MOUSE_DIST = 180;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Subtle mouse repulsion
        if (mx > 0) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MOUSE_DIST && d > 0) {
            const force = (1 - d / MOUSE_DIST) * 0.6;
            p.x += (dx / d) * force;
            p.y += (dy / d) * force;
          }
        }

        // Bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }

      // Connections
      ctx.strokeStyle = 'rgba(46, 230, 133, 0.4)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.4;
            ctx.strokeStyle = `rgba(46, 230, 133, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const p of particles) {
        // Mouse proximity glow
        let glow = 0;
        if (mx > 0) {
          const dx = p.x - mx, dy = p.y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MOUSE_DIST) glow = 1 - d / MOUSE_DIST;
        }
        ctx.fillStyle = `rgba(46, 230, 133, ${0.6 + glow * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ============================================================
     3. CUSTOM CURSOR (desktop only)
     ============================================================ */
  if (isFinePointer && !prefersReducedMotion) {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const aurora = document.getElementById('aurora');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my, ax = mx, ay = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });

    function tick() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';

      ax += (mx - ax) * 0.05;
      ay += (my - ay) * 0.05;
      aurora.style.left = ax + 'px';
      aurora.style.top = ay + 'px';

      requestAnimationFrame(tick);
    }
    tick();

    document.querySelectorAll('[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
    window.addEventListener('mousedown', () => ring.classList.add('click'));
    window.addEventListener('mouseup', () => ring.classList.remove('click'));
  }

  /* ============================================================
     4. MAGNETIC BUTTONS
     ============================================================ */
  if (isFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.magnetic').forEach(btn => {
      const strength = 22;

      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / (r.width / 2);
        const dy = (e.clientY - cy) / (r.height / 2);
        btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  /* ============================================================
     5. 3D TILT CARDS (capability pillars)
     ============================================================ */
  if (isFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      const inner = card.querySelector('.pillar-inner');
      if (!inner) return;

      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;

        // Radial spotlight position
        card.style.setProperty('--mx', (x * 100) + '%');
        card.style.setProperty('--my', (y * 100) + '%');

        // 3D tilt
        const tiltX = (y - 0.5) * -8;
        const tiltY = (x - 0.5) * 8;
        inner.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateX(0) rotateY(0)';
      });
    });
  } else {
    // Mobile: keep the radial hover working with touch
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('touchstart', (e) => {
        const r = card.getBoundingClientRect();
        const t = e.touches[0];
        card.style.setProperty('--mx', ((t.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((t.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ============================================================
     6. HERO LOGO PARALLAX (desktop)
     ============================================================ */
  const heroLogo = document.getElementById('heroLogo');
  if (heroLogo && isFinePointer && !prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      heroLogo.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ============================================================
     7. MOBILE NAV TOGGLE
     ============================================================ */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    const openNav = () => {
      navLinks.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const closeNav = () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeNav() : openNav();
    });

    // Tapping a link closes the menu...
    // ...and tapping anywhere else on the open overlay (the empty space)
    // dismisses it too — no need to pick a destination.
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target === navLinks || e.target.tagName === 'LI') {
        closeNav();
      }
    });

    // Escape key also closes it.
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) closeNav();
    });
  }

  /* ============================================================
     8. SCAN RAIL (right-side scroll indicator)
     ============================================================ */
  const scanBead = document.getElementById('scanBead');
  if (scanBead) {
    function updateScanBead() {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const clamped = Math.max(0, Math.min(1, scrollPct));
      scanBead.style.top = (clamped * 100) + 'vh';
    }
    window.addEventListener('scroll', updateScanBead, { passive: true });
    updateScanBead();
  }

  /* ============================================================
     9. SCROLL REVEAL
     ============================================================ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ============================================================
     11. TERMINAL TYPING
     ============================================================ */
  const termLines = [
    { type: 'comment', text: '# palmx — how an engagement actually runs' },
    { type: 'blank' },
    { type: 'cmd', prompt: '$', text: 'palmx scope --threat-model client' },
    { type: 'out', text: '→ mapping the real attack surface' },
    { type: 'out', text: '→ rules of engagement signed' },
    { type: 'ok', text: '✓ scope locked' },
    { type: 'blank' },
    { type: 'cmd', prompt: '$', text: 'palmx pentest --evidence' },
    { type: 'out', text: '→ chaining findings, capturing proofs' },
    { type: 'warn', text: '⚠ exploitable path found — documented' },
    { type: 'ok', text: '✓ reproducible report + remediation' },
    { type: 'blank' },
    { type: 'cmd', prompt: '$', text: 'palmx ai build --with-evals' },
    { type: 'out', text: '→ pipeline built, eval harness attached' },
    { type: 'info', text: '→ safety + red-team review' },
    { type: 'ok', text: '✓ shipped with guardrails' },
    { type: 'blank' },
    { type: 'cmd', prompt: '$', text: 'palmx ship --secure-by-default' },
    { type: 'out', text: '→ health checks green · staged rollout' },
    { type: 'ok', text: '✓ delivered — and we stay for the retest' }
  ];

  const termBody = document.getElementById('terminalBody');
  let termStarted = false;

  if (termBody) {
    const termObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !termStarted) {
          termStarted = true;
          typeTerminal();
          termObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    termObserver.observe(document.querySelector('.terminal'));
  }

  function typeTerminal() {
    let lineIdx = 0;

    function nextLine() {
      if (lineIdx >= termLines.length) {
        const cur = document.createElement('span');
        cur.className = 'cursor-blink';
        termBody.appendChild(cur);
        return;
      }
      const line = termLines[lineIdx];
      const el = document.createElement('span');
      el.className = 'term-line';

      if (line.type === 'blank') {
        el.innerHTML = '&nbsp;';
        termBody.appendChild(el);
        lineIdx++;
        setTimeout(nextLine, 80);
        return;
      }

      let prefix = '';
      let cls = 'term-out';
      if (line.type === 'comment') cls = 'term-comment';
      else if (line.type === 'cmd') { prefix = `<span class="term-prompt">${line.prompt}</span> `; cls = 'term-cmd'; }
      else if (line.type === 'ok') cls = 'term-ok';
      else if (line.type === 'warn') cls = 'term-warn';
      else if (line.type === 'crit') cls = 'term-crit';
      else if (line.type === 'info') cls = 'term-info';

      el.innerHTML = prefix + `<span class="${cls}"></span>`;
      termBody.appendChild(el);
      const target = el.querySelector(`.${cls}`);

      let charIdx = 0;
      const speed = line.type === 'cmd' ? 20 : 6;

      function typeChar() {
        if (charIdx >= line.text.length) {
          lineIdx++;
          setTimeout(nextLine, line.type === 'cmd' ? 280 : 90);
          return;
        }
        target.textContent += line.text[charIdx];
        charIdx++;
        setTimeout(typeChar, speed);
      }
      typeChar();
    }
    nextLine();
  }

  /* ============================================================
     12. SHOWCASE — capability switcher
     ============================================================ */
  const showcaseKeys = ['pen', 'ai', 'sw'];

  const showcase = document.querySelector('.showcase');
  const tabs = document.querySelectorAll('.showcase-tab');
  const tabIndicator = document.getElementById('tabIndicator');
  const visuals = document.querySelectorAll('.visual');
  const infoNum = document.getElementById('infoNum');
  const infoTagline = document.getElementById('infoTagline');
  const infoTitle = document.getElementById('infoTitle');
  const infoBody = document.getElementById('infoBody');
  const infoTags = document.getElementById('infoTags');
  const cycleFill = document.getElementById('cycleFill');

  let activeIdx = 0;
  let cycleTimer = null;
  let cycleStart = 0;
  const CYCLE_DURATION = 6000;
  let userControlled = false;

  function applyShowcaseText(idx) {
    const key = showcaseKeys[idx];
    if (infoNum) infoNum.textContent = String(idx + 1).padStart(2, '0');
    if (infoTagline) infoTagline.textContent = t('show.' + key + '.tag');
    if (infoTitle) infoTitle.innerHTML = t('show.' + key + '.title');
    if (infoBody) infoBody.textContent = t('show.' + key + '.body');
    if (infoTags) {
      const tags = t('show.' + key + '.tags') || [];
      infoTags.innerHTML = tags.map(x => '<span class="info-tag">' + x + '</span>').join('');
    }
  }
  refreshShowcase = () => applyShowcaseText(activeIdx);

  function setActive(idx, fromUser = false) {
    if (idx === activeIdx && !fromUser) return;
    activeIdx = idx;

    tabs.forEach((t, i) => {
      const active = i === idx;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    if (tabIndicator) {
      if (window.innerWidth > 640) {
        tabIndicator.style.transform = `translateX(${idx * 100}%)`;
      } else {
        tabIndicator.style.transform = `translateY(${idx * 100}%)`;
      }
    }

    visuals.forEach((v, i) => {
      v.classList.toggle('active', i === idx);
    });

    const infoBlock = document.querySelector('.stage-info');
    if (infoBlock) {
      infoBlock.classList.remove('info-fade');
      void infoBlock.offsetWidth;
      infoBlock.classList.add('info-fade');
    }

    applyShowcaseText(idx);

    if (fromUser) {
      userControlled = true;
      stopCycle();
      setTimeout(() => {
        if (userControlled) {
          userControlled = false;
          startCycle();
        }
      }, 12000);
    }
  }

  function startCycle() {
    if (prefersReducedMotion) return;
    stopCycle();
    cycleStart = performance.now();

    function step(now) {
      const elapsed = now - cycleStart;
      const t = Math.min(1, elapsed / CYCLE_DURATION);
      if (cycleFill) cycleFill.style.width = (t * 100) + '%';

      if (t >= 1) {
        const next = (activeIdx + 1) % showcaseKeys.length;
        setActive(next);
        cycleStart = performance.now();
      }
      cycleTimer = requestAnimationFrame(step);
    }
    cycleTimer = requestAnimationFrame(step);
  }

  function stopCycle() {
    if (cycleTimer) cancelAnimationFrame(cycleTimer);
    cycleTimer = null;
    if (cycleFill) cycleFill.style.width = '0%';
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => {
      const idx = parseInt(t.dataset.index, 10);
      setActive(idx, true);
    });
  });

  window.addEventListener('resize', () => {
    if (tabIndicator) {
      if (window.innerWidth > 640) {
        tabIndicator.style.transform = `translateX(${activeIdx * 100}%)`;
      } else {
        tabIndicator.style.transform = `translateY(${activeIdx * 100}%)`;
      }
    }
  });

  if (showcase) {
    const scObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !userControlled) {
          startCycle();
        } else if (!e.isIntersecting) {
          stopCycle();
        }
      });
    }, { threshold: 0.3 });
    scObs.observe(showcase);
  }

  setActive(0);

  /* ============================================================
     14. DISCOVERY-CALL POPUP  +  EMAIL
     ============================================================ */
  const callModal = document.getElementById('callModal');
  const bookCallBtn = document.getElementById('bookCallBtn');
  const emailBtn = document.getElementById('emailBtn');
  const PHONE_DISPLAY = '0571682789';
  const EMAIL = 'pxt@palmxtechnology.sa';

  if (callModal && bookCallBtn) {
    const openModal = () => {
      callModal.classList.add('open');
      callModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      callModal.classList.remove('open');
      callModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    bookCallBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    // Close on backdrop tap or the X button.
    callModal.querySelectorAll('[data-close], #callModalClose').forEach(el => {
      el.addEventListener('click', closeModal);
    });
    // Close on Escape.
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && callModal.classList.contains('open')) closeModal();
    });

    // "Call now" fires the tel: link; close the popup after it hands off.
    const callNow = document.getElementById('callNow');
    if (callNow) callNow.addEventListener('click', () => setTimeout(closeModal, 300));

    // Copy the number to the clipboard with a fallback for non-secure contexts.
    const copyBtn = document.getElementById('copyPhone');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const original = copyBtn.textContent;
        try {
          await navigator.clipboard.writeText(PHONE_DISPLAY);
        } catch (_) {
          const ta = document.createElement('textarea');
          ta.value = PHONE_DISPLAY;
          ta.style.cssText = 'position:fixed;opacity:0;';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (e2) {}
          document.body.removeChild(ta);
        }
        copyBtn.textContent = 'Copied \u2713';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.classList.remove('copied');
        }, 1800);
      });
    }
  }

  // Email button — reliably open the mail composer addressed to PalmX.
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Discovery call \u2014 PalmX');
    });
  }

  /* ============================================================
     15. SCROLL PROGRESS + NAV STATE
     ============================================================ */
  const scrollProgress = document.getElementById('scrollProgress');
  const navEl = document.querySelector('.nav');
  function onScrollUI() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = pct + '%';
    if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScrollUI, { passive: true });
  onScrollUI();

  /* ============================================================
     16. LANGUAGE SWITCHER
     ============================================================ */
  const langSwitch = document.getElementById('langSwitch');
  const langBtn = document.getElementById('langBtn');
  if (langSwitch && langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = langSwitch.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    langSwitch.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        applyLang(opt.dataset.lang);
        langSwitch.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', (e) => {
      if (!langSwitch.contains(e.target)) langSwitch.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') langSwitch.classList.remove('open');
    });
  }

  // Apply saved or default language on load.
  let savedLang = 'en';
  try { savedLang = localStorage.getItem('palmx-lang') || 'en'; } catch (e) {}
  applyLang(savedLang);

})();
