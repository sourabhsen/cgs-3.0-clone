'use strict';

describe('View Model: Career Exploration', function() {
  var vm, mockBackend, $rootScope, User,
    mockUserGoalResponse = '{"totalNumberOfResults":2,"lastPage":false,"results":[{"name":"Social Services Manager","jobCodeType":"RONET","id":"11-9151.00"},{"name":"Social / Human Service Assistant","jobCodeType":"RONET","id":"21-1093.00"}],"numberOfElements":2,"firstPage":true,"pageNumber":0,"pageSize":0,"nextPage":1,"previousPage":-1,"totalPages":0}',
    mockSkillsResponse = '{"11-9151.00":[{"importance":38.5259,"skill":{"skillId":185287,"name":"communication skills","displayName":"Communication Skills","description":"Communication (from Latin comm?nic?re, meaning \\"to share\\" ) is the activity of conveying information through the exchange of ideas, feelings, intentions, attitudes, expectations, perceptions or commands, as by speech, gestures, writings, behaviour and possibly by other means such as electromagnetic, chemical or physical phenomena. It is the meaningful exchange of information between two or more participants (machines, organisms or their parts). Communication requires a sender, a message, a medium and a recipient, although the receiver does not have to be present or aware of the sender\'s intent to communicate at the time of communication; thus communication can occur across vast distances in time and space. Communication requires that the communicating parties share an area of communicative commonality. The communication process is complete once the receiver understands the sender\'s message. Communicating with others involves three primary steps: Thought: First, information exists in the mind of the sender. This can be a concept, idea, information, or feeling. Encoding: Next, a message is sent to a receiver in words or other symbols. Decoding: Lastly, the receiver translates the words or symbols into a concept or information that a person can understand. There are a variety of verbal and non-verbal forms of communication. These include body language, eye contact, sign language, haptic communication, and chronemics. Other examples are media content such as pictures, graphics, sound, and writing. The Convention on the Rights of Persons with Disabilities also defines the communication to include the display of text, Braille, tactile communication, large print, accessible multimedia, as well as written and plain language, human-reader, augmentative and alternative modes, means and formats of communication, including accessible information and communication technology. Feedback is a critical component of effective communication."},"userDeclaredLevel":"Beginner","wikipediaUrl":"http://en.wikipedia.org/wiki/Communication","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":34.9615,"skill":{"skillId":225653,"name":"organizational skills","displayName":"Organizational Skills","description":"Organizing (also spelled organising) for structure is the act of rearranging elements following one or more rules. Commonly, anything is considered organized when it looks like everything has a correct order or placement, and is in an specific location. But it\'s only ultimately organized if any element has no difference on time taken to find it. In that sense, organizing can also be defined as to place different objects in logical arrangement for better searching."},"userDeclaredLevel":"Advanced","wikipediaUrl":"http://en.wikipedia.org/wiki/Organizing_(structure)","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":31.2871,"skill":{"skillId":255501,"name":"writing","displayName":"Writing","description":"Writing is a medium of communication that represents language through the inscription of signs and symbols. In most languages, writing is a complement to speech or spoken language. Writing is not a language but a form of technology. Within a language system, writing relies on many of the same structures as speech, such as vocabulary, grammar and semantics, with the added dependency of a system of signs or symbols, usually in the form of a formal alphabet. The result of writing is generally called text, and the recipient of text is called a reader. Motivations for writing include publication, storytelling, correspondence and diary. Writing has been instrumental in keeping history, dissemination of knowledge through the media and the formation of legal systems. As human societies emerged, the development of writing was driven by pragmatic exigencies such as exchanging information, maintaining financial accounts, codifying laws and recording history. Around the 4th millennium BCE, the complexity of trade and administration in Mesopotamia outgrew human memory, and writing became a more dependable method of recording and presenting transactions in a permanent form. In both Ancient Egypt and Mesoamerica writing may have evolved through calendrics and a political necessity for recording historical and environmental events."},"userDeclaredLevel":"Beginner","wikipediaUrl":"http://en.wikipedia.org/wiki/Writing","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":26.9967,"skill":{"skillId":213767,"name":"leadership","displayName":"Leadership","description":"Leadership has been described as \\"a process of social influence in which one person can enlist the aid and support of others in the accomplishment of a common task\\". For example, some understand a leader simply as somebody whom people follow, or as somebody who guides or directs others, while others define leadership as \\"organizing a group of people to achieve a common goal\\". Studies of leadership have produced theories involving traits, situational interaction, function, behavior, power, vision and values, charisma, and intelligence, among others."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Leadership","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":26.4246,"skill":{"skillId":242003,"name":"social services","displayName":"Social Services","description":"Social services are a range of public services provided by any national or regional government organization for its residents, including such things as health care, public housing, social care and social security. Not all public services are social services. Some companies use social service as means of marketing or tax saving medium."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Social_services","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":25.3025,"skill":{"skillId":229263,"name":"planning","displayName":"Planning","description":"Planning (also called forethought) is the process of thinking about and organizing the activities required to achieve a desired goal. Planning involves the creation and maintenance of a plan. As such, planning is a fundamental property of intelligent behavior. This thought process is essential to the creation and refinement of a plan, or integration of it with other plans; that is, it combines forecasting of developments with the preparation of scenarios of how to react to them. An important, albeit often ignored aspect of planning, is the relationship it holds with forecasting. Forecasting can be described as predicting what the future will look like, whereas planning predicts what the future should look like. The counterpart to planning is spontaneous order."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Planning","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":22.0462,"skill":{"skillId":245641,"name":"supervisory skills","displayName":"Supervisory Skills","description":"A supervisor, foreman, foreperson, boss, overseer, cell coach, facilitator, or area coordinator is a manager in a position of trust in business. The US Bureau of Census has four hundred titles under the supervisor classification. An employee is a supervisor if he has the power and authority to do the following actions (according to the Ontario Ministry of Labour): Give instructions and/or orders to subordinates. Be held responsible for the work and actions of other employees. If an employee cannot do the above, legally he or she is probably not a supervisor, but in some other category, such as lead hand. A supervisor is first and foremost an overseer whose main responsibility is to ensure that a group of subordinates get out the assigned amount of production, when they are supposed to do it and within acceptable levels of quality, costs and safety. A supervisor is responsible for the productivity and actions of a small group of employees. The supervisor has several manager-like roles, responsibilities, and powers. Two of the key differences between a supervisor and a manager are (1) the supervisor does not typically have \\"hire and fire\\" authority, and (2) the supervisor does not have budget authority. Lacking \\"hire and fire\\" authority means that a supervisor may not recruit the employees working in the supervisor\'s group nor does the supervisor have the authority to terminate an employee. The supervisor may participate in the hiring process as part of interviewing and assessing candidates, but the actual hiring authority rests in the hands of a Human Resource Manager. The supervisor may recommend to management that a particular employee be terminated and the supervisor may be the one who documents the behaviors leading to the recommendation but the actual firing authority rests in the hands of a manager. Lacking budget authority means that a supervisor is provided a budget developed by management within which constraints the supervisor is expected to provide a productive environment for the employees of the supervisor\'s work group. A supervisor will usually have the authority to make purchases within specified limits. A supervisor is also given the power to approve work hours and other payroll issues. Normally, budget affecting requests such as travel will require not only the supervisor\'s approval but the approval of one or more layers of management. As a member of management, a supervisor\'s main job is more concerned with orchestrating and controlling work rather than performing it directly."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Supervisor"},{"importance":16.4136,"skill":{"skillId":181215,"name":"case management","displayName":"Case Management","description":"Medical case management is a collaborative process that facilitates recommended treatment plans to assure the appropriate medical care is provided to disabled, ill or injured individuals. It refers to the planning and coordination of health care services appropriate to achieve the goal of medical rehabilitation. Medical case management may include, but is not limited to, care assessment, including personal interview with the injured employee, and assistance in developing, implementing and coordinating a medical care plan with health care providers, as well as the employee and his/her family and evaluation of treatment results. Medical case management requires the evaluation of a medical condition, developing and implementing a plan of care, coordinating medical resources, communicated healthcare needs to the individual, monitors an individual’s progress and promotes cost-effective care. The term also has usage in the USA health care system, referring to the case management coordination in the Managed care environment."},"userDeclaredLevel":"Advanced","wikipediaUrl":"http://en.wikipedia.org/wiki/Medical_case_management","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":16.3256,"skill":{"skillId":219125,"name":"microsoft excel","displayName":"Microsoft Excel","description":"Microsoft Excel is a spreadsheet application developed by Microsoft for Microsoft Windows and Mac OS. It features calculation, graphing tools, pivot tables, and a macro programming language called Visual Basic for Applications. It has been a very widely applied spreadsheet for these platforms, especially since version 5 in 1993, and it has replaced Lotus 1-2-3 as the industry standard for spreadsheets. Excel forms part of Microsoft Office."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Microsoft_Excel","assessmentData":{"url":"https://smarterer.com/partners/apollo/tests/excel/run?embed=true","description":"Microsoft Excel is a spreadsheet application, and part of the Microsoft Office suite.","icon":"http://cdn-smarterer.s3-website-us-east-1.amazonaws.com/test_logos/owy3yzi5nzzkzdk.png","name":"Excel"},"userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":15.6216,"skill":{"skillId":216409,"name":"management","displayName":"Management","description":"Management in business and organizations is the function that coordinates the efforts of people to accomplish goals and objectives using available resources efficiently and effectively. Management comprises planning, organizing, staffing, leading or directing, and controlling an organization or initiative to accomplish a goal. Resourcing encompasses the deployment and manipulation of human resources, financial resources, technological resources, and natural resources. Management is also an academic discipline, a social science whose object of study is the social organization."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Management","assessmentData":{"url":"https://smarterer.com/partners/apollo/tests/people-management/run?embed=true","description":"Test your people management skills.","icon":"http://cdn-smarterer.s3-website-us-east-1.amazonaws.com/test_logos/people.png","name":"People Management"},"userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":13.8174,"skill":{"skillId":231483,"name":"problem solving","displayName":"Problem Solving","description":"Problem solving consists of using generic or ad hoc methods, in an orderly  manner, for finding solutions to problems. Some of the problem-solving  techniques ..."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Problem_solving#Problem-solving_strategies","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":13.4653,"skill":{"skillId":236131,"name":"research","displayName":"Research","description":"Research comprises \\"creative work undertaken on a systematic basis in order to increase the stock of knowledge, including knowledge of man, culture and society, and the use of this stock of knowledge to devise new applications.\\" It is used to establish or confirm facts, reaffirm the results of previous work, solve new or existing problems, support theorems, or develop new theories. A research project may also be an expansion on past work in the field. To test the validity of instruments, procedures, or experiments, research may replicate elements of prior projects, or the project as a whole. The primary purposes of basic research (as opposed to applied research) are documentation, discovery, interpretation, or the research and development (R&D) of methods and systems for the advancement of human knowledge. Approaches to research depend on epistemologies, which vary considerably both within and between humanities and sciences. There are several forms of research: scientific, humanities, artistic, economic, social, business, marketing, practitioner research, etc."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Research","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":12.6073,"skill":{"skillId":219161,"name":"microsoft office","displayName":"Microsoft Office","description":"Microsoft Office is an office suite of desktop applications, servers and services for the Microsoft Windows and OS X operating systems. It was first announced by Bill Gates of Microsoft on August 1, 1988 at COMDEX in Las Vegas. Initially a marketing term for a bundled set of applications, the first version of Office contained Microsoft Word, Microsoft Excel and Microsoft PowerPoint. Over the years, Office applications have grown substantially closer with shared features such as a common spell checker, OLE data integration and Visual Basic for Applications scripting language. Microsoft also positions Office as a development platform for line-of-business software under the Office Business Applications brand. On 10 July 2012, Softpedia reported that Office is used by over a billion people worldwide. The current versions are Office 2013 for Windows, released on October 11, 2012; and Office 2011 for OS X, released October 26, 2010. On 24 October 2012, the RTM final code of Office 2013 Professional Plus was released to TechNet and MSDN subscribers for download. On 15 November 2012, the 60-day trial version of Office 2013 Professional Plus was released for download. All devices running Windows Phone and Windows RT come pre-installed with Office Mobile and Office RT, respectively. Office Mobile is also available for Android phones and the iPhone. A version of Office for the iPad was launched in March 2014. A web-based version of Office called Office Online, (formerly Office Web Apps) is also available."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Microsoft_Office","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":9.571,"skill":{"skillId":189369,"name":"customer service","displayName":"Customer Service","description":"Customer service is the provision of service to customers before, during and after a purchase. According to Turban et al. (2002), \\"Customer service is a series of activities designed to enhance the level of customer satisfaction ? that is, the feeling that a product or service has met the customer expectation.\\" The importance of customer service may vary by product or service, industry and customer. The perception of success of such interactions will be dependent on employees \\"who can adjust themselves to the personality of the guest,\\" according to Micah Solomon. Customer service can also refer to the culture of the organization - the priority the organization assigns to customer service relative to other components, such as product innovation or low price. In this sense, an organization that values good customer service may spend more money in training employees than average organization, or proactively interview customers for feedback. From the point of view of an overall sales process engineering effort, customer service plays an important role in an organization\'s ability to generate income and revenue. From that perspective, customer service should be included as part of an overall approach to systematic improvement. A customer service experience can change the entire perception a customer has of the organization."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Customer_service","assessmentData":{"url":"https://smarterer.com/partners/apollo/tests/customer-service/run?embed=true","description":"Tests the understanding of core customer service concepts.","icon":"http://cdn-smarterer.s3-website-us-east-1.amazonaws.com/test_logos/mdvhntg5zddhyjl.png","name":"Customer Service"},"userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":8.6249,"skill":{"skillId":179275,"name":"budgeting","displayName":"Budgeting","description":"A budget is a quantitative expression of a plan for a defined period of time. It may include planned sales volumes and revenues, resource quantities, costs and expenses, assets, liabilities and cash flows. It expresses strategic plans of business units, organizations, activities or events in measurable terms."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Budget"},{"importance":8.6029,"skill":{"skillId":192255,"name":"discharge planning","displayName":"Discharge Planning","description":"Healthcare professionals involved in rehabilitation are often involved in discharge planning for patients. When considering patient discharge, there are a number of factors to take into consideration: the patient\'s current state, their place of residence and the type of support available. When considering the patient\'s current state, although the patient may be eligible for discharge it is important to examine factors such as the likelihood of re-injury to avoid higher health care costs. Patients\' homes should also be visited and examined before they are discharged from the hospital to determine any immediate challenges and corresponding goals, adaptations and assistive devices that need to be implemented. Follow-up appointments should also be coordinated with the patient prior to discharge to monitor the patient\'s progress as well as any potential complications that may have arisen."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Inpatient_care#Progress","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":8.3828,"skill":{"skillId":238783,"name":"scheduling","displayName":"Scheduling","description":"A schedule or a timetable, as a basic time-management tool, consists of a list of times at which possible tasks, events, or actions are intended to take place, or of a sequence of events in the chronological order in which such things are intended to take place. The process of creating a schedule - deciding how to order these tasks and how to commit resources between the variety of possible tasks - is called scheduling, and a person responsible for making a particular schedule may be called a scheduler. Making and following schedules is an ancient human activity, though perhaps not a universal one. Some scenarios associate \\"this kind of planning\\" with learning \\"life skills\\". In a wide variety of situations schedules are necessary, or at least useful. Schedules can usefully span both short periods, such as a daily or weekly schedule, and long-term planning with respect to periods of several months or years. They are often made using a calendar, where the person making the schedule can note the dates and times at which various events are planned to occur. Schedules that do not set forth specific times for events to occur may instead list algorithmically an expected order in which events either can or must take place."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Schedule"},{"importance":8.1408,"skill":{"skillId":232483,"name":"project management","displayName":"Project Management","description":"Project management is the process and activity of planning, organizing, motivating, and controlling resources, procedures and protocols to achieve specific goals in scientific or daily problems. A project is a temporary endeavor designed to produce a unique product, service or result  with a defined beginning and end (usually time-constrained, and often constrained by funding or deliverables), undertaken to meet unique goals and objectives, typically to bring about beneficial change or added value. The temporary nature of projects stands in contrast with business as usual (or operations), which are repetitive, permanent, or semi-permanent functional activities to produce products or services. In practice, the management of these two systems is often quite different, and as such requires the development of distinct technical skills and management strategies. The primary challenge of project management is to achieve all of the project goals and objectives while honoring the preconceived constraints. The primary constraints are scope, time, quality and budget. The secondary ? and more ambitious ? challenge is to optimize the allocation of necessary inputs and integrate them to meet pre-defined objectives."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Project_management","assessmentData":{"url":"https://smarterer.com/partners/apollo/tests/project-management/run?embed=true","description":"The process of planning, organizing and achieving project goals. ","icon":"http://cdn-smarterer.s3-website-us-east-1.amazonaws.com/test_logos/yjkzmgniy2e3y2q.png","name":"Project Management"}},{"importance":7.9208,"skill":{"skillId":191221,"name":"detail-oriented","displayName":"Detail-Oriented","description":"A detail oriented person is an individual who has an eye for details and making a conscious effort to understand the actual cause behind an occurrence happens to be his second nature."},"userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":7.7228,"skill":{"skillId":233199,"name":"psychology","displayName":"Psychology","description":"Psychology is an academic and applied discipline that involves the scientific study of mental functions and behaviors. Psychology has the immediate goal of understanding individuals and groups by both establishing general principles and researching specific cases, and by many accounts it ultimately aims to benefit society. In this field, a professional practitioner or researcher is called a psychologist and can be classified as a social, behavioral, or cognitive scientist. Psychologists attempt to understand the role of mental functions in individual and social behavior, while also exploring the physiological and biological processes that underlie cognitive functions and behaviors. Psychologists explore concepts such as perception, cognition, attention, emotion, phenomenology, motivation, brain functioning, personality, behavior, and interpersonal relationships, including psychological resilience, family resilience, and other areas. Psychologists of diverse orientations also consider the unconscious mind. Psychologists employ empirical methods to infer causal and correlational relationships between psychosocial variables. In addition, or in opposition, to employing empirical and deductive methods, some?especially clinical and counseling psychologists?at times rely upon symbolic interpretation and other inductive techniques. Psychology has been described as a \\"hub science\\", with psychological findings linking to research and perspectives from the social sciences, natural sciences, medicine, and the humanities, such as philosophy. While psychological knowledge is often applied to the assessment and treatment of mental health problems, it is also directed towards understanding and solving problems in many different spheres of human activity. The majority of psychologists are involved in some kind of therapeutic role, practicing in clinical, counseling, or school settings. Many do scientific research on a wide range of topics related to mental processes and behavior, and typically work in university psychology departments or teach in other academic settings (e.g., medical schools, hospitals). Some are employed in industrial and organizational settings, or in other areas such as human development and aging, sports, health, and the media, as well as in forensic investigation and other aspects of law."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Psychology","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":7.5688,"skill":{"skillId":250137,"name":"treatment planning","displayName":"Treatment Planning","description":"Therapy (often abbreviated tx or Tx) is the attempted remediation of a health problem, usually following a diagnosis. In the medical field, it is synonymous with treatment (also abbreviated tx). Among psychologists and other mental health professionals including psychiatrists, psychiatric nurse practitioners, and clinical social workers, the term may refer specifically to psychotherapy or talking therapies. The English word therapy comes via Latin therapīa from Greek: θεραπεία and literally means \\"curing\\" or \\"healing\\". As a rule, each therapy has indications and contraindications."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Therapy","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":7.5248,"skill":{"skillId":219189,"name":"microsoft powerpoint","displayName":"Microsoft Powerpoint","description":"Microsoft PowerPoint is a slide show presentation program developed by Microsoft. It was officially launched on May 22, 1990, as a part of the Microsoft Office suite. The benefits of PowerPoint are continuously debated. The term \\"PowerPoint hell\\" has been coined for long, tedious PowerPoint presentations that bore the audience."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Microsoft_PowerPoint","assessmentData":{"url":"https://smarterer.com/partners/apollo/tests/powerpoint/run?embed=true","description":"Microsoft PowerPoint is a presentation and slideshow design program, part of the Microsoft Office suite.","icon":"http://cdn-smarterer.s3-website-us-east-1.amazonaws.com/test_logos/yzi5ndizmtbhndy.png","name":"Microsoft PowerPoint"},"userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":7.0407,"skill":{"skillId":218499,"name":"mental health","displayName":"Mental Health","description":"Mental health (or behavioral health) is a level of psychological well-being, or an absence of a mental disorder; it is the \\"psychological state of someone who is functioning at a satisfactory level of emotional and behavioral adjustment\\". From the perspective of positive psychology or holism, mental health may include an individual\'s ability to enjoy life, and create a balance between life activities and efforts to achieve psychological resilience. According to World Health Organization (WHO) mental health includes \\"subjective well-being, perceived self-efficacy, autonomy, competence, intergenerational dependence, and self-actualization of one?s intellectual and emotional potential, among others.\\" WHO further states that the well-being of an individual is encompassed in the realization of their abilities, coping with normal stresses of life, productive work and contribution to their community. However, cultural differences, subjective assessments, and competing professional theories all affect how \\"mental health\\" is defined. ?Behavioral health? is the preferred term to ?mental health.? A person struggling with his or her behavioral health may face stress, depression, anxiety, relationship problems, grief, addiction, ADHD or learning disabilities, mood disorders, or other psychological concerns. Counselors, therapists, life coaches, psychologists, nurse practitioners or physicians can help manage behavioral health concerns with treatments such as therapy, counseling, or medication. The new field of global mental health is \\"the area of study, research and practice that places a priority on improving mental health and achieving equity in mental health for all people worldwide\\"."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Mental_health","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":6.9967,"skill":{"skillId":215465,"name":"long-term care","displayName":"Long-Term Care","description":"This article is about a type of health and social care service. For specific information on providers of such services, see for example Personal Care Assistant and Geriatric care management.  Long-term care (LTC) is a variety of services which help meet both the medical and non-medical needs of people with a chronic illness or disability who cannot care for themselves for long periods of time. It is common for long-term care to provide custodial and non-skilled care, such as assisting with normal daily tasks like dressing, and using the bathroom. Increasingly, long-term care involves providing a level of medical care that requires the expertise of skilled practitioners to address the often multiple chronic conditions associated with older populations. Long-term care can be provided at home, in the community, in assisted living facilities or in nursing homes. Long-term care may be needed by people of any age, although it is a more common need for senior citizens."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Long-term_care"},{"importance":6.1606,"skill":{"skillId":219253,"name":"microsoft word","displayName":"Microsoft Word","description":"Microsoft Word is a word processor developed by Microsoft. It was first released in 1983 under the name Multi-Tool Word for Xenix systems. Subsequent versions were later written for several other platforms including IBM PCs running DOS (1983), Apple Macintosh running Mac OS (1985), AT&T Unix PC (1985), Atari ST (1988), SCO Unix (1994), OS/2 (1989), and Microsoft Windows (1989). Commercial versions of Word are licensed as a standalone product or as a component of Microsoft Office, Windows RT or the discontinued Microsoft Works suite. Freeware editions of Word are Microsoft Word Viewer and Office Online, both of which have limited features."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Microsoft_Word","assessmentData":{"url":"https://smarterer.com/partners/apollo/tests/word/run?embed=true","description":"Microsoft Word is a word processor, and part of the Microsoft Office suite","icon":"http://cdn-smarterer.s3-website-us-east-1.amazonaws.com/test_logos/ogixotq1yju5zdm.png","name":"Microsoft Word"},"userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":5.5666,"skill":{"skillId":248833,"name":"time management","displayName":"Time Management","description":"Time management is the act or process of planning and exercising conscious control over the amount of time spent on specific activities, especially to increase effectiveness, efficiency or productivity. It is a meta-activity with the goal to maximize the overall benefit of a set of other activities within the boundary condition of a limited amount of time. Time management may be aided by a range of skills, tools, and techniques used to manage time when accomplishing specific tasks, projects, and goals complying with a due date. Initially, time management referred to just business or work activities, but eventually the term broadened to include personal activities as well. A time management system is a designed combination of processes, tools, techniques, and methods. Time management is usually a necessity in any project development as it determines the project completion time and scope. The major themes arising from the literature on time management include the following: Creating an environment conducive to effectiveness Setting of priorities Carrying out activity around those priorities The related process of reduction of time spent on non-priorities Time management has been considered to be a subset of different concepts such as: Project management. Time Management can be considered to be a project management subset and is more commonly known as project planning and project scheduling. Time Management has also been identified as one of the core functions identified in project management. Attention management: Attention Management relates to the management of cognitive resources, and in particular the time that humans allocate their mind (and organize the minds of their employees) to conduct some activities. Personal knowledge management: see below (Personal time management)."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Time_management","assessmentData":{"url":"https://smarterer.com/partners/apollo/tests/time-management/run?embed=true","description":"Time Management is the practice of effectively organizing, managing, and investing your and your team&#39;s time.","icon":"http://cdn-smarterer.s3-website-us-east-1.amazonaws.com/test_logos/9jdhdcjjgnhs0-nbnhwdbbarzpy.png","name":"Time Management"}},{"importance":5.4345,"skill":{"skillId":232321,"name":"program development","displayName":"Program Development","description":"The United Nations Development Programme (UNDP) is the United Nations\' global development network. Headquartered in New York City, UNDP advocates for change and connects countries to knowledge, experience and resources to help people build a better life. It provides expert advice, training, and grant support to developing countries, with increasing emphasis on assistance to the least developed countries. The status of UNDP is that of an executive board within the United Nations General Assembly. The UNDP Administrator is the third highest-ranking official of the United Nations after the United Nations Secretary-General and Deputy Secretary-General. To accomplish the MDGs and encourage global development, UNDP focuses on poverty reduction, HIV/AIDS, democratic governance, energy and environment, social development, and crisis prevention and recovery. UNDP also encourages the protection of human rights and the empowerment of women in all of its programmes. The UNDP Human Development Report Office also publishes an annual Human Development Report (since 1990) to measure and analyse developmental progress. In addition to a global Report, UNDP publishes regional, national, and local Human Development Reports. UNDP is funded entirely by voluntary contributions from member nations. The organization has country offices in 177 countries, where it works with local governments to meet development challenges and develop local capacity. Additionally, the UNDP works internationally to help countries achieve the Millennium Development Goals (MDGs). Currently, the UNDP is one of the main UN agencies involved in the development of the Post-2015 Development Agenda. UNDP operates in 177 countries, working with nations on their own solutions to global and national development challenges. As they develop local capacity, they draw on the people of UNDP and its wide range of partners."},"wikipediaUrl":"http://en.wikipedia.org/wiki/United_Nations_Development_Programme"},{"importance":5.0165,"skill":{"skillId":203853,"name":"grant writing","displayName":"Grant Writing","description":"Grant writing refers to the practice of completing an application process for funding provided by an institution such as a government department, corporation, foundation or trust. Such application processes are often referred to as either grant \\"proposals\\" or \\"submissions.\\" Successful grant writing requires a clear understanding of grantsmanship. While the principles and fundamentals of grantsmanship apply broadly, it is important to know the target and to be able to tune the language appropriately. Understanding the creation process of a grant proposal is a big part of the success in grant writing. The basic parts to the proposal creation process include: Analyzing the intended audience for the proposal Analyzing the purpose of the proposal Gathering information about the subject of the proposal Choosing the appropriate type of proposal (in this case, a grant proposal) Writing the proposal Formatting the proposal Revising, editing, and proof reading the proposal Submitting the proposal"},"wikipediaUrl":"http://en.wikipedia.org/wiki/Grant_writing","assessmentData":{"url":"https://smarterer.com/partners/apollo/tests/grant-writing/run?embed=true","description":"Grant writing is the practice of creating a proposal for institutional funding.","icon":"http://cdn-smarterer.s3-website-us-east-1.amazonaws.com/test_logos/n_mlywxqsm69zj8qwuyjyqgafqg.png","name":"Grant Writing"}},{"importance":4.4004,"skill":{"skillId":249717,"name":"training programs","displayName":"Training Programs","description":"Training and development is a function of human resource management concerned with organizational activity aimed at bettering the performance of individuals and groups in organizational settings. It has been known by several names, including \\"human resource development\\", and \\"learning and development\\"."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Training_and_development"},{"importance":4.3784,"skill":{"skillId":233421,"name":"public speaking","displayName":"Public Speaking","description":"Public speaking is the process and act of speaking or giving a lecture to a group of people in a structured, deliberate manner intended to inform, influence, or entertain a listening audience. Public speaking is commonly understood as face-to-face speaking between individuals and an audience for the purpose of communication. It is closely allied to \\"presenting\\", although the latter is more often associated with commercial activity. Most of the time, public speaking is to persuade the audience."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Public_speaking"},{"importance":3.3663,"skill":{"skillId":188519,"name":"crisis intervention","displayName":"Crisis Intervention","description":"Crisis Intervention is emergency psychological care aimed at assisting individuals in a crisis situation to restore equilibrium to their biopsychosocial functioning and to minimise the potential for psychological trauma. Crisis can be defined as one?s perception or experiencing of an event or situation as an intolerable difficulty that exceeds the person?s current resources and coping mechanisms. The priority of crisis intervention and counseling is to increase stabilization. Crisis interventions occur at the spur of the moment and in a variety of settings, as trauma can arise instantaneously. Crises are temporary, usually with short span, no longer than a month, although the effects may become long-lasting. Crisis Intervention is the emergency and temporary care given an individual who, because of unusual stress in his or her life that renders them unable to function as they normally would, in order to interrupt the downward spiral of maladaptive behavior and return the individual to their usual level of pre-crisis functioning."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Crisis_intervention","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":3.1683,"skill":{"skillId":227043,"name":"patient care","displayName":"Patient Care","description":"Health care (or healthcare) is the diagnosis, treatment, and prevention of disease, illness, injury, and other physical and mental impairments in human beings. Health care is delivered by practitioners in allied health, dentistry, midwifery (obstetrics), medicine, nursing, optometry, pharmacy, psychology and other health professions. It refers to the work done in providing primary care, secondary care, and tertiary care, as well as in public health. Access to health care varies across countries, groups, and individuals, largely influenced by social and economic conditions as well as the health policies in place. Countries and jurisdictions have different policies and plans in relation to the personal and population-based health care goals within their societies. Health care systems are organizations established to meet the health needs of target populations. Their exact configuration varies between national and subnational entities. In some countries and jurisdictions, health care planning is distributed among market participants, whereas in others, planning occurs more centrally among governments or other coordinating bodies. In all cases, according to the World Health Organization (WHO), a well-functioning health care system requires a robust financing mechanism; a well-trained and adequately-paid workforce; reliable information on which to base decisions and policies; and well maintained health facilities and logistics to deliver quality medicines and technologies. Health care can contribute to a significant part of a country\'s economy. In 2011, the health care industry consumed an average of 9.3 percent of the GDP or US$ 3,322 (PPP-adjusted) per capita across the 34 members of OECD countries. The USA (17.7%, or US$ PPP 8,508), the Netherlands (11.9%, 5,099), France (11.6%, 4,118), Germany (11.3%, 4,495), Canada (11.2%, 5669), and Switzerland (11%, 5,634) were the top spenders, however life expectancy in total population at birth was highest in Switzerland (82.8 years), Japan and Italy (82.7), Spain and Iceland (82.4), France (82.2) and Australia (82.0), while OECD\'s average exceeds 80 years for the first time ever in 2011: 80.1 years, a gain of 10 years since 1970. The USA (78.7 years) ranges only on place 26 among the 34 OECD member countries, but has the highest costs by far. All OECD countries have achieved universal (or almost universal) health coverage, except Mexico and the USA. (see also international comparisons.) Health care is conventionally regarded as an important determinant in promoting the general physical and mental health and well-being of people around the world. An example of this was the worldwide eradication of smallpox in 1980, declared by the WHO as the first disease in human history to be completely eliminated by deliberate health care interventions."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Health_care","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}},{"importance":3.0583,"skill":{"skillId":235131,"name":"record keeping","displayName":"Record Keeping","description":"Records management (RM), also known as Records information management or RIM, is the professional practice or discipline of controlling and governing what are considered to be the most important records of an organization throughout the records life-cycle, which includes from the time such records are conceived through to their eventual disposal. This work includes identifying, classifying, prioritizing, storing, securing, archiving, preserving, retrieving, tracking and destroying of records. Records management is part of an organization\'s broader activities that are associated with the discipline or field known as Governance, risk, and compliance (or \\"GRC\\") and is primarily concerned with the evidence of an organization\'s activities as well as the reduction or mitigation of risk that may be associated with such evidence. A record is defined as being something that represents proof of existence and that can be used to recreate or prove state of existence, regardless of medium or characteristics. A record is either created or received by an organization in pursuance of or compliance with legal obligations, or in the transaction of business. Records can be either tangible objects, such as paper documents like birth certificates, driver\'s licenses, and physical medical x-rays, or digital information, such as electronic office documents, data in application databases, web site content, and electronic mail (email)."},"wikipediaUrl":"http://en.wikipedia.org/wiki/Records_management","userJobCodesThisSkillAppearsIn":{"21-1093.00":"Social / Human Service Assistant"}}]}';

  beforeEach(function() {
    module('configMock');
    module('multiTenantHttpBackend');
    module('skillBuilder.vm');
  });

  beforeEach(inject(function(_SkillBuilderViewModel_, _$httpBackend_, _$rootScope_, _User_) {
    mockBackend = _$httpBackend_;
    vm = _SkillBuilderViewModel_;
    $rootScope = _$rootScope_;
    User = _User_;
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
    vm = mockBackend = User = undefined;
  });

  describe('getUserGoals()', function() {
    it('should reject if no profileId defined', function() {
      var err = null;
      vm.getUserGoals().catch(function(error) {
        err = error;
      });
      expect(err).toBeNull();
      $rootScope.$digest();
      expect(err).toBe('User.profileId must be set');
      expect(vm.goals).toBeUndefined();
    });

    it('should set goals', function() {
      var profileId = '1111-2223-3abc';
      var goals = null;
      User.profileId = profileId;
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/users/1111-2223-3abc/jobCodes').respond(mockUserGoalResponse);

      vm.getUserGoals().then(function(data) {
        goals = data;
      });
      expect(goals).toBeNull();

      mockBackend.flush();
      expect(goals).toBeDefined();
      expect(goals.length).toBe(2);
      expect(goals[0].name).toBe('Social Services Manager');
      expect(goals[0].id).toBe('11-9151.00');
      expect(vm.goals).toEqual(goals);
    });

    it('should set goals to empty array when invalid response (handled by service)', function() {
      var profileId = '1111-2223-3abc';
      var goals = null;
      User.profileId = profileId;
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/users/1111-2223-3abc/jobCodes').respond('{}');

      vm.getUserGoals().then(function(data) {
        goals = data;
      });
      expect(goals).toBeNull();

      mockBackend.flush();
      expect(goals).toBeDefined();
      expect(goals).toEqual([]);
      expect(vm.goals).toEqual(goals);
    });

    it('should handle 404 and not reject promise', function() {
      var profileId = '1111-2223-3abc';
      var goals = null;
      User.profileId = profileId;
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/users/1111-2223-3abc/jobCodes').respond(404, '');
      vm.getUserGoals().then(function(data) {
        goals = data;
      });
      expect(goals).toBeNull();
      mockBackend.flush();
      expect(goals).toEqual([]);
      expect(vm.goals).toEqual(goals);
    });

    it('should handle 503 and reject promise', function() {
      var profileId = '1111-2223-3abc';
      var err = null;
      User.profileId = profileId;
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/users/1111-2223-3abc/jobCodes').respond(503, '');
      vm.getUserGoals().catch(function(error) {
        err = error;
      });
      expect(err).toBeNull();
      mockBackend.flush();
      expect(err).toBeDefined();
      expect(err.status).toBe(503);
      // console.log(JSON.stringify(err));
      expect(vm.goals).toBeUndefined();
    });
  });

  describe('getSkills()', function() {
    it('should reject if goalId not set', function() {
      var err = null;
      vm.params.goalId = '11-9151.00';
      vm.getSkills().catch(function(error) {
        err = error;
      });
      expect(err).toBeNull();
      $rootScope.$digest();
      expect(err).toEqual('goalId parameter and User.profileId must be set');
      expect(vm.skills).toBeUndefined();
    });

    it('should reject if User.profileId not set', function() {
      var err = null;
      User.profileId = '1111-2223-3abc';
      vm.getSkills().catch(function(error) {
        err = error;
      });
      expect(err).toBeNull();
      $rootScope.$digest();
      expect(err).toEqual('goalId parameter and User.profileId must be set');
      expect(vm.skills).toBeUndefined();
    });

    it('should set goals properly when params provided', function() {
      var skills = null;
      User.profileId = '1111-2223-3abc';
      vm.params.goalId = '11-9151.00';
      mockBackend.expectGET('/api/skill-service/1/skills/occupations/RONET?jobcode=11-9151.00&maximumskills=15&profileid=1111-2223-3abc&sort=Importance&tenantid=[TENANT]').respond(mockSkillsResponse);
      vm.getSkills().then(function(data) {
        skills = data;
      });
      expect(skills).toBeNull();
      mockBackend.flush();

      expect(skills).toBeDefined();
      expect(skills.length).toBe(33);
      expect(skills[0].wikipediaUrl).toBe('http://en.wikipedia.org/wiki/Communication');
      expect(angular.isArray(skills[0].userJobCodesThisSkillAppearsIn)).toBeTruthy();
      expect(skills[0].userJobCodesThisSkillAppearsIn[0].id).toBe('21-1093.00');
      expect(skills[0].userJobCodesThisSkillAppearsIn[0].name).toBe('Social / Human Service Assistant');
      // console.log(JSON.stringify(skills[0], null, 2));
    });

    it('should return empty skills array when response does not contain goalId', function() {
      var skills = null;
      User.profileId = '1111-2223-3abc';
      vm.params.goalId = 'foobar';
      mockBackend.expectGET('/api/skill-service/1/skills/occupations/RONET?jobcode=foobar&maximumskills=15&profileid=1111-2223-3abc&sort=Importance&tenantid=[TENANT]').respond(mockSkillsResponse);
      vm.getSkills().then(function(data) {
        skills = data;
      });
      expect(skills).toBeNull();
      mockBackend.flush();

      expect(skills).toBeDefined();
      expect(skills.length).toBe(0);
    });
  });

  describe('init()', function() {
    it('should reject if profileId not provided', function() {
      var err = null;
      vm.init().catch(function(error) {
        err = error;
      });
      expect(err).toBeNull();
      $rootScope.$digest();
      expect(err).toEqual('User.profileId must be set');
      expect(vm.skills).toBeUndefined();
    });

    it('should set goals to empty array when none (404)', function() {
      var profileId = '1111-2223-3abc';
      User.profileId = profileId;
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/users/1111-2223-3abc/jobCodes').respond(404, '');
      vm.init();
      mockBackend.flush();

      expect(vm.goals).toEqual([]);
    });

    it('should set skills to first user goal when available', function() {
      var profileId = '1111-2223-3abc';
      User.profileId = profileId;
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/users/1111-2223-3abc/jobCodes').respond(mockUserGoalResponse);
      mockBackend.expectGET('/api/skill-service/1/skills/occupations/RONET?jobcode=11-9151.00&maximumskills=15&profileid=1111-2223-3abc&sort=Importance&tenantid=[TENANT]').respond(mockSkillsResponse);
      vm.init();
      mockBackend.flush();

      expect(vm.goals.length).toBe(2);
      expect(vm.goals[0].name).toBe('Social Services Manager');
      expect(vm.goals[0].id).toBe('11-9151.00');
      expect(vm.params.goalId).toEqual(vm.goals[0].id);
      expect(vm.skills.length).toBe(33);
    });

    it('should set skills to requested goalId when available', function() {
      var profileId = '1111-2223-3abc',
        goalId = '21-1093.00';
      User.profileId = profileId;
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/users/1111-2223-3abc/jobCodes').respond(mockUserGoalResponse);
      mockBackend.expectGET('/api/skill-service/1/skills/occupations/RONET?jobcode=21-1093.00&maximumskills=15&profileid=1111-2223-3abc&sort=Importance&tenantid=[TENANT]').respond({});
      vm.init(goalId);
      mockBackend.flush();

      expect(vm.goals.length).toBe(2);
      expect(vm.goals[0].name).toBe('Social Services Manager');
      expect(vm.goals[0].id).toBe('11-9151.00');
      expect(vm.params.goalId).toEqual(goalId);
      expect(vm.skills).toBeDefined();
      expect(vm.skills.length).toBe(0);
    });

    it('should set skills to first goalId requested goalId not found', function() {
      var profileId = '1111-2223-3abc',
        goalId = 'foo';
      User.profileId = profileId;
      mockBackend.expectGET('/api/labormarket-service/1/cgsdemo/users/1111-2223-3abc/jobCodes').respond(mockUserGoalResponse);
      mockBackend.expectGET('/api/skill-service/1/skills/occupations/RONET?jobcode=11-9151.00&maximumskills=15&profileid=1111-2223-3abc&sort=Importance&tenantid=[TENANT]').respond(mockSkillsResponse);
      vm.init(goalId);
      mockBackend.flush();

      expect(vm.goals.length).toBe(2);
      expect(vm.goals[0].name).toBe('Social Services Manager');
      expect(vm.goals[0].id).toBe('11-9151.00');
      expect(vm.params.goalId).toEqual(vm.goals[0].id);
      expect(vm.skills.length).toBe(33);
    });
  });

  describe('saveSkillLevel()', function() {
    it('should reject if profileId param not set', function() {
      var err = null;
      vm.saveSkillLevel().catch(function(error) {
        err = error;
      });
      expect(err).toBeNull();
      $rootScope.$digest();
      expect(err).toEqual('User.profileId must be set');
    });

    it('should reject if skill not defined', function() {
      var profileId = '1111-2223-3abc',
        err = null;
      User.profileId = profileId;

      vm.saveSkillLevel().catch(function(error) {
        err = error;
      });
      expect(err).toBeNull();
      $rootScope.$digest();
      expect(err).toEqual('skill argument must be defined and have both skill.skillId and .userDeclaredLevel properties');
    });

    it('should reject if skill id not defined', function() {
      var profileId = '1111-2223-3abc',
        err = null,
        skill = {
          userDeclaredLevel: 'Advanced'
        };
      User.profileId = profileId;

      vm.saveSkillLevel(skill).catch(function(error) {
        err = error;
      });
      expect(err).toBeNull();
      $rootScope.$digest();
      expect(err).toEqual('skill argument must be defined and have both skill.skillId and .userDeclaredLevel properties');
    });

    it('should reject if skill userDeclaredLevel not defined', function() {
      var profileId = '1111-2223-3abc',
        err = null,
        skill = {
          skill: {
            skillId: 1111
          }
        };
      User.profileId = profileId;

      vm.saveSkillLevel(skill).catch(function(error) {
        err = error;
      });
      expect(err).toBeNull();
      $rootScope.$digest();
      expect(err).toEqual('skill argument must be defined and have both skill.skillId and .userDeclaredLevel properties');
    });


    it('should save skill level', function() {
      var profileId = '1111-2223-3abc',
        skill = {
          userDeclaredLevel: 'Advanced',
          skill: {
            skillId: '1111'
          }
        },
        postBody = '{"userIdentifier":"1111-2223-3abc","listType":"SKILL","listItems":[{"itemType":"SKILL","userIdentifier":"1111-2223-3abc","itemIdentifier":"1111","itemSequence":"1","itemStatus":"SAVED","priority":"Advanced"}],"name":"Skills","description":"My skill level list","ownerType":"USER","privacyType":"Private"}',
        saveResponse = '{"listId":34535,"tenantName":"uopx","name":"Skills","listType":"SKILL","ownerType":"USER","userIdentifier":"1111-2223-3abc","userIdentifierType":"USER","privacyType":"Private","description":"My skill level list","createDate":"2015-06-24T18:26:12.000Z","listItems":[{"listItemId":188687,"listId":34535,"itemType":"SKILL","itemIdentifier":"1111","itemSequence":1,"itemStatus":"COMPLETE","priority":"Advanced","createDate":"2015-06-24T20:55:13.000Z"}]}';

      User.profileId = profileId;

      mockBackend.expectGET('/api/playlist-service/1/cgsdemo/users/1111-2223-3abc/lists').respond(404, '');
      mockBackend.expectPOST('/api/playlist-service/1/cgsdemo/users/1111-2223-3abc/lists').respond(function(method, url, data) {
        expect(data).toBe(postBody);
        return [201, saveResponse, { /*headers*/ }];
      });
      vm.saveSkillLevel(skill);
      mockBackend.flush();
    });
    // add test scenarios on pre-existing playlist
  });

  describe('reportInvalidSkillDescription()', function() {
    it('should reject if skillId not provided', function() {
      var err = null;
      vm.reportInvalidSkillDescription().catch(function(error) {
        err = error;
      });
      expect(err).toBeNull();
      $rootScope.$digest();
      expect(err).toEqual('skillId parameter must be provided');
    });


    it('should report invalid skill description', function() {
      var skillId = '1111';

      mockBackend.expectPOST('/api/skill-service/1/sendEmail?skillid=1111').respond('');
      vm.reportInvalidSkillDescription(skillId);
      mockBackend.flush();
    });

    it('should report invalid skill description and call success callback', function() {
      var skillId = '1111',
        cb = {
          onSuccess: angular.noop
        };

      spyOn(cb, 'onSuccess');

      mockBackend.expectPOST('/api/skill-service/1/sendEmail?skillid=1111').respond('');
      vm.reportInvalidSkillDescription(skillId, cb.onSuccess);
      mockBackend.flush();
      expect(cb.onSuccess).toHaveBeenCalled();
    });
  });

  describe('expandContractSkill()', function() {
    var localStorageService, $timeout;

    beforeEach(inject(function(_localStorageService_, _$timeout_) {
      localStorageService = _localStorageService_;
      $timeout = _$timeout_;
    }));

    afterEach(function() {
      localStorageService.clearAll();
      localStorageService = $timeout = undefined;
    });


    it('should do nothing if no skill id', function() {
      vm.expandContractSkill();
    });

    it('should save expanded skill then delete it when contracted', function() {
      var skillId = '1111',
        skillsExpanded;

      vm.expandContractSkill(skillId, true);
      $timeout.flush();
      skillsExpanded = localStorageService.get('skillBuilder.skills.expanded');
      expect(skillsExpanded).toEqual({
        1111: true
      });

      vm.expandContractSkill(skillId);
      $timeout.flush();
      skillsExpanded = localStorageService.get('skillBuilder.skills.expanded');
      expect(skillsExpanded).toEqual({});
    });

  });

});
