<!-- TODO: Finish converting page to Tailwind/Skeleton -->
<!-- TODO: Add images -->
<!-- TODO: Add accordions to reduce clutter -->
<script>
    import { AppShell } from '@skeletonlabs/skeleton';
    import Timeline from '$lib/Timeline.svelte';
</script>

<div class="portfolio">
    <section class="contact-methods">
        <h1 class="h1">Jeffery Navarra</h1>
        <div class="contact-method email">
            <i class="fa fa-envelope" />
            <a href="mailto:jeff.navarra@miapeer.com">Jeff.Navarra@miapeer.com</a>
        </div>
        <div class="contact-method phone">
            <i class="fa fa-mobile-alt" />
            <span>248-905-1645</span>
        </div>
        <div class="contact-method website">
            <i class="fa fa-cloud" />
            <a href="/">miapeer.com</a>
        </div>
        <div class="contact-method website">
            <i class="fa-brands fa-github" />
            <a href="https://github.com/Miapeer" openNewTab>Check out my GitHub repo</a>
        </div>
    </section>

    <section class="personal">
        <h2 class="h2">A little about myself</h2>
        <div class="summary">
            I'm a software engineer with over 25 years of experience. Most of my experience has been
            centered around emergency management for multiple clients within the Department of
            Energy. I've worked primarily with the Microsoft stack, but more recently with Python.
            For me, puzzle-solving is part of the appeal of discovering software solutions. I am
            hard-working, self-motivated, and passionate about software development. I'm always
            looking to learn new skills to add to my toolbelt.
        </div>
    </section>

    <section class="skills">
        <h2 class="h2">Skills</h2>
        <div class="chips">
            {#each ['Python', 'C#', 'HTML', 'CSS', 'JavaScript', 'FastAPI', 'SQL Server', 'MySQL', 'PostgreSQL', 'SQLModel', 'SQL Alchemy', 'Entity Framework', 'NodeJS', 'ASP.NET MVC', 'KnockoutJS', 'React', 'Svelte', 'SvelteKit', 'Azure', 'AWS'] as skill}
                <button type="button" class="btn btn-sm variant-ghost-primary">{skill}</button>
            {/each}
        </div>
    </section>

    <section class="timeline">
        <h2 class="h2">Timeline</h2>
        <div class="timeline-wrapper">
            <Timeline
                data={[
                    {
                        text: 'AlphaTRAC',
                        start: {
                            month: 2,
                            year: 2006
                        },
                        end: {
                            month: 2,
                            year: 2018
                        },
                        side: 'left'
                    },
                    {
                        text: 'CyberGRX',
                        start: {
                            month: 5,
                            year: 2021
                        },
                        end: {
                            month: 12,
                            year: 2023
                        },
                        side: 'left'
                    },
                    {
                        text: 'Webroot',
                        start: {
                            month: 4,
                            year: 2018
                        },
                        end: {
                            month: 5,
                            year: 2021
                        },
                        side: 'left'
                    },
                    {
                        text: 'Miapeer',
                        start: {
                            month: 8,
                            year: 2015
                        },
                        side: 'right'
                    },
                    {
                        text: 'Blue Lizard Software',
                        start: {
                            month: 2,
                            year: 1998
                        },
                        end: {
                            month: 8,
                            year: 2009
                        },
                        side: 'right'
                    },
                    {
                        text: 'Apparatus',
                        start: {
                            month: 4,
                            year: 2001
                        },
                        end: {
                            month: 5,
                            year: 2001
                        },
                        side: 'left'
                    },
                    {
                        text: 'Cavion',
                        start: {
                            month: 10,
                            year: 2000
                        },
                        end: {
                            month: 12,
                            year: 2000
                        },
                        side: 'left'
                    },
                    {
                        text: 'Echostar',
                        start: {
                            month: 7,
                            year: 1997
                        },
                        end: {
                            month: 10,
                            year: 2000
                        },
                        side: 'left'
                    }
                ]}
            />
        </div>
    </section>

    <section class="experience-list">
        <h2 class="h2">Experience</h2>

        <!-- --------------------------------------------- -->

        <div class="experience">
            <div class="header">
                <h3 class="h3 h3 title">CyberGRX / ProcessUnity</h3>
                <div class="sub">
                    <div class="position">Senior Software Engineer</div>
                    <div class="timeframe">May 2021 - December 2023</div>
                    <div class="location">Denver, CO</div>
                </div>
            </div>

            <div class="details">
                <div class="detail">
                    <h4 class="h4 task">Full-stack development of web platform</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">Python</Chip> -->
                        <!-- <Chip size="extra-small">pytest</Chip> -->
                        <!-- <Chip size="extra-small">PostgreSQL</Chip> -->
                        <!-- <Chip size="extra-small">React</Chip> -->
                        <!-- <Chip size="extra-small">RTL</Chip> -->
                        <!-- <Chip size="extra-small">Jest</Chip> -->
                        <!-- <Chip size="extra-small">MUI</Chip> -->
                        <!-- <Chip size="extra-small">Argo Workflows</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                My day-to-day work involved the debugging and the creation of new
                                features for the entire development stack ranging from Terraform to
                                React.
                            </li>
                            <li>
                                I worked on a team that was primarily focused on rebuilding the
                                processes necessary to deprecate the existing graph database and
                                instead use a relational database.
                            </li>
                            <li>
                                While the majority of the tasks focused on the back-end, my
                                front-end experience positioned me as the primary developer
                                responsible for virtually all front-end aspects of the work.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Enhanced company match</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">Python</Chip> -->
                        <!-- <Chip size="extra-small">PostgreSQL</Chip> -->
                        <!-- <Chip size="extra-small">React</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I had the opportunity to work with the same key personnel on this
                                similar task as my Company Master work at Webroot. Keeping the
                                previous foundational experience in mind I was able to redesign and
                                improve upon the original work, taking it from an entirely SQL-based
                                solution to one that could utilize the entire technology stack.
                            </li>
                            <li>
                                I incorporated additional techniques like transliteration and
                                additional tools like ZoomInfo to further enhance the company
                                matching process.
                            </li>
                            <li>
                                This feature was foundational for the key engineering goals to move
                                our data and systems to use a relational database, achieve an
                                automated customer bulk ingest process, improve the results from the
                                company search page, and provide the initial integration component
                                with ProcessUnity.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Bulk ingest</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">Python</Chip> -->
                        <!-- <Chip size="extra-small">PostgreSQL</Chip> -->
                        <!-- <Chip size="extra-small">React</Chip> -->
                        <!-- <Chip size="extra-small">Terraform</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I took on the role of team technical lead to drive this feature,
                                which heavily utilized my previous Company Master work.
                            </li>
                            <li>
                                This epic required me to spearhead the use of
                                new-to-our-architecture features and technologies including AWS
                                Lambda, AWS EventBridge, and ZoomInfo.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Merger integration</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">Python</Chip> -->
                        <!-- <Chip size="extra-small">PostgreSQL</Chip> -->
                        <!-- <Chip size="extra-small">ASP.Net MVC</Chip> -->
                        <!-- <Chip size="extra-small">SQL Server</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I was the sole developer from CyberGRX on the integration team
                                working with ProcessUnity to unify the unique functionality of both
                                platforms.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- --------------------------------------------- -->

        <div class="experience">
            <div class="header">
                <h3 class="h3 h3 title">Miapeer LLC</h3>
                <div class="sub">
                    <div class="position">Founder</div>
                    <div class="timeframe">August 2015 - Present</div>
                    <div class="location">Westminster, CO</div>
                </div>
            </div>

            <div class="details">
                <div class="detail">
                    <h4 class="h4 task">
                        CAPARS (Computer Assisted Protective Action Recommendation System) upgrades
                        and maintenance
                    </h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">Python</Chip> -->
                        <!-- <Chip size="extra-small">NodeJS</Chip> -->
                        <!-- <Chip size="extra-small">KnockoutJS</Chip> -->
                        <!-- <Chip size="extra-small">Bootstrap</Chip> -->
                        <!-- <Chip size="extra-small">MySQL</Chip> -->
                        <!-- <Chip size="extra-small">Java</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I am currently working with Los Alamos National Laboratory for
                                consultation and the active development of their multiple
                                installations of CAPARS.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Financial web application (Quantum)</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">Python</Chip> -->
                        <!-- <Chip size="extra-small">NodeJS</Chip> -->
                        <!-- <Chip size="extra-small">Svelte</Chip> -->
                        <!-- <Chip size="extra-small">SvelteKit</Chip> -->
                        <!-- <Chip size="extra-small">SQL Azure</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I designed this app to empower individuals in managing their
                                finances through intuitive tracking and budgeting features.
                            </li>
                            <li>
                                This project was born out of necessity when other financial
                                applications lacked features that I needed for my own money
                                management. The original version was a desktop application written
                                in VB6. The current version has a web application front-end with a
                                Python REST API. I still use this for my personal finances to this
                                day.
                            </li>
                            <li>
                                This is hosted on Microsoft Azure utilizing continuous deployment
                                via Azure DevOps and Azure Container Registry.
                            </li>
                            <!-- <li>
                                Feel free to take it for a spin: &nbsp;<a
                                class="hover-underline"
                                href="https://quantum.miapeer.com"
                                target="_blank">Quantum</a
                                >
                                <ul class="list-disc">
                                    <li>User name: demo@miapeer.com</li>
                                    <li>Password: demo</li>
                                </ul>
                            </li> -->
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Work with clients to bring solutions to market</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">ASP.Net MVC</Chip> -->
                        <!-- <Chip size="extra-small">KnockoutJS</Chip> -->
                        <!-- <Chip size="extra-small">Bootstrap</Chip> -->
                        <!-- <Chip size="extra-small">SignalR</Chip> -->
                        <!-- <Chip size="extra-small">SQL Azure</Chip> -->
                        <!-- <Chip size="extra-small">MS Access</Chip> -->
                        <!-- <Chip size="extra-small">Wordpress</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I was the consultant, architect, and engineer for the full
                                development and deployment of Courtesy Service's web application.
                            </li>
                            <li>
                                I worked with Nussentials to prepare their upgraded Wordpress
                                eCommerce site for release to the public.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- --------------------------------------------- -->

        <div class="experience">
            <div class="header">
                <h3 class="h3 h3 title">Webroot / Carbonite / OpenText</h3>
                <div class="sub">
                    <div class="position">Senior Software Engineer</div>
                    <div class="timeframe">April 2018 - May 2021</div>
                    <div class="location">Broomfield, CO</div>
                </div>
            </div>

            <div class="details">
                <div class="detail">
                    <h4 class="h4 task">Research and development of Company Master initiative</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">SQL Server</Chip> -->
                        <!-- <Chip size="extra-small">Python</Chip> -->
                        <!-- <Chip size="extra-small">React</Chip> -->
                        <!-- <Chip size="extra-small">PHP</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I developed a new process for fuzzy name and address matching to
                                improve duplicate company identification and prevention.
                            </li>
                            <li>
                                I evaluated and implemented various APIs and algorithms such as
                                Google Places API, weighted scoring, and a new architecture for
                                deriving and searching alternate names.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Continued improvement of eCommerce systems</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">SQL Server</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                My primary role at this company was a SQL developer. I extended
                                functionality and debugged business logic within the database
                                schema. This included customer data, subscriptions, billing, orders,
                                website routing, and more.
                            </li>
                            <li>
                                I received reports and performed production data support for
                                customers and product licenses in order to keep the data clean and
                                processes running smoothly.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Marketo person import process</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">Python</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I worked with the marketing department to create a more efficient
                                person import process to assist in the transition from Eloqua to
                                Marketo. This carried forward to allow the rapid import of marketing
                                contact lists.
                            </li>
                            <li>
                                The updated process performed data validation and normalization of
                                500k records every month, which improved processing time from 45
                                days to 1 hour.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Front-end development</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">React</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I improved the user's search experience by incorporating Google's
                                Geolocation service to allow for more casual address input.
                            </li>
                            <li>
                                I updated the email marketing opt-out form to use React. This work
                                also helped prevent potential data-mining by providing the user with
                                a generic message and performing the appropriate validation at the
                                database.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- --------------------------------------------- -->

        <div class="experience">
            <div class="header">
                <h3 class="h3 h3 title">AlphaTRAC</h3>
                <div class="sub">
                    <div class="position">Senior Software Engineer</div>
                    <div class="timeframe">February 2006 - February 2018</div>
                    <div class="location">Westminster, CO</div>
                </div>
            </div>

            <div class="details">
                <div class="detail">
                    <h4 class="h4 task">
                        Department of Energy EPHA (Emergency Planning Hazards Assessment) automation
                        from client data to final report output
                    </h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">C#</Chip> -->
                        <!-- <Chip size="extra-small">VB.Net</Chip> -->
                        <!-- <Chip size="extra-small">VB6</Chip> -->
                        <!-- <Chip size="extra-small">SQL Server</Chip> -->
                        <!-- <Chip size="extra-small">MS Access</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I was tasked with the maintenance and future development of the
                                in-house software used to generate emergency management reports. I
                                took this app through multiple iterations as a developer-only tool
                                to something that analysts could pilot themselves. The original
                                version was written in VB6 and used a substantial amount of
                                Excel/Word automation. My focus was to keep that application running
                                while working to replace the VB6 elements with C#. Years later, the
                                project was reborn again using NodeJS and Python (See CAPARS below).
                            </li>
                            <li>
                                I worked with analysts and scientists to customize the requested
                                EPHA reports to fit client needs.
                            </li>
                            <li>
                                I pioneered and implemented an approximation algorithm for chemical
                                Threshold Screening Quantity calculation to improve accuracy and
                                reduce unnecessary analysis.
                            </li>
                            <li>
                                I increased the performance and precision of EPIcode and Hotspot
                                automation tools, including the creation of a tool to combine
                                multiple outputs into a single mixture.
                            </li>
                            <li>
                                I developed a tool to calculate the evaporation of puddles of
                                hazardous materials using client inventory.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">
                        Lead developer of CAPARS (Computer Assisted Protective Action Recommendation
                        System) emergency management response and reporting application
                    </h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">Python</Chip> -->
                        <!-- <Chip size="extra-small">NodeJS</Chip> -->
                        <!-- <Chip size="extra-small">KnockoutJS</Chip> -->
                        <!-- <Chip size="extra-small">Bootstrap</Chip> -->
                        <!-- <Chip size="extra-small">MySQL</Chip> -->
                        <!-- <Chip size="extra-small">Java</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I maintained and updated the original version, which is still in
                                production. Notably, I solved recurring client network security
                                conflicts which impeded system communication by streamlining from a
                                dual server configuration to a single server with a hosted virtual
                                machine. This had the additional benefit of simplifying server
                                administration and deployment. In addition, I enhanced the wind
                                field applet to be user configurable which allowed for faster custom
                                client deployments
                            </li>
                            <li>
                                I created the next generation version for EPHA generation using new
                                dispersion/consequence assessment modeling methodology. This
                                performed modeling using real meteorological data from the site
                                rather than theoretical wind conditions with simple straight-line
                                models to more accurately reflect dispersion through complex
                                terrain. The application was designed for parallelized and
                                distributed computing with the intent to utilize the full processing
                                power of a multi-core system and allow additional machines to
                                "subscribe" in order to assist with the workload.
                            </li>
                            <li>
                                I recommended and custom built real-time emergency response and
                                consequence analysis servers to client specifications and budget. On
                                these servers I performed server administration including OS
                                upgrades, repairs, and security updates.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">
                        Interactive emergency response training software (AlphaACT)
                    </h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">ASP.Net MVC</Chip> -->
                        <!-- <Chip size="extra-small">KnockoutJS</Chip> -->
                        <!-- <Chip size="extra-small">Bootstrap</Chip> -->
                        <!-- <Chip size="extra-small">Entity Framework</Chip> -->
                        <!-- <Chip size="extra-small">SQL Azure</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                This was originally developed as a desktop application for analysis
                                and production of Protective Action Plans. It later expanded into a
                                web-based crisis decision training platform for first responders. I
                                prepared the application for demo at EMI SIG after which I received
                                special recognition for creating a Minimum Viable Product (MVP)
                                system in an extremely short period of time.
                            </li>
                            <li>
                                I worked with an external company to evaluate the integration of
                                their pattern recognition engine (PRE). This effort eventually
                                turned towards developing a custom PRE in-house to drive the system
                                to a definitive answer as quickly as possible. I also collaborated
                                with external software teams to integrate the AlphaTRAC system into
                                their custom user interfaces and Learning Management Systems (LMS).
                            </li>
                            <li>
                                It originally handled chemical and radiological hazard scenarios for
                                the Department of Energy and grew to serve additional fields
                                including the Marine Corps, fire service, rail operations, and law
                                enforcement.
                            </li>
                            <li>
                                It was deployed to Azure but could optionally be installed
                                on-premise in order to protect sensitive data.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Experience gathering platform (XCapture)</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">ASP.Net MVC</Chip> -->
                        <!-- <Chip size="extra-small">KnockoutJS</Chip> -->
                        <!-- <Chip size="extra-small">Bootstrap</Chip> -->
                        <!-- <Chip size="extra-small">Entity Framework</Chip> -->
                        <!-- <Chip size="extra-small">SQL Azure</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I developed this web application and REST API for converting SME
                                after-action reports into training scenarios for AlphaACT, which was
                                designed to be adaptable for various fields and implementations.
                            </li>
                            <li>
                                Additionally, I created an Android version of the application,
                                enabling offline deployment to remote locations.
                            </li>
                            <li>
                                The project involved a question-and-answer style
                                experience-gathering interview for transforming SME after-action
                                reports into training scenarios.
                            </li>
                            <li>
                                I worked in collaboration with external teams, such as the IAFC
                                (International Association of Fire Chiefs), to integrate the
                                XCapture API with their user interface.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">
                        Implementation, refinement, and upkeep of several software processes and
                        operations
                    </h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">Azure</Chip> -->
                        <!-- <Chip size="extra-small">Jira</Chip> -->
                        <!-- <Chip size="extra-small">Excel</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I set up and administered an on-premises installation of Jira for
                                issue management and process workflow adherence.
                            </li>
                            <li>
                                I worked on a company IEEE-compliance committee for Software Quality
                                Assurance. This included implementing processes and writing system
                                documentation.
                            </li>
                            <li>
                                Government contracts came with time-tracking and administrative
                                requirements, which off-the-shelf software couldn't meet. I created
                                an Excel-based timecard solution to improve accuracy between
                                accounting, project managers, and employees. This timecard system
                                was used daily by every employee for over 10 years.
                            </li>
                            <li>
                                I managed the evolution of our source code and company documentation
                                from CVS to Subversion and then later split them to more modern
                                specialty tools, Git and Sharepoint
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Windows Server, Linux, and Azure administration</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">Azure</Chip> -->
                        <!-- <Chip size="extra-small">Windows</Chip> -->
                        <!-- <Chip size="extra-small">Linux</Chip> -->
                        <!-- <Chip size="extra-small">Mac</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I became the primary individual responsible for any IT issues that
                                came up. I built, purchased, and maintained workstations and
                                servers, upgraded the network infrastructure, and implemented
                                security protocols.
                            </li>
                            <li>
                                When the company shifted to a fully remote workforce, I played a key
                                role by migrating the business's systems, infrastructure, and
                                operations. This included moving web applications to Microsoft
                                Azure, transferring company services to their cloud-based
                                counterparts such as Quickbooks, and implementing other
                                collaborative tools such as Slack.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- --------------------------------------------- -->

        <div class="experience">
            <div class="header">
                <h3 class="h3 title">Blue Lizard Software LLC</h3>
                <div class="sub">
                    <div class="position">Co-Founder</div>
                    <div class="timeframe">February 1998 - August 2009</div>
                    <div class="location">Westminster, CO</div>
                </div>
            </div>

            <div class="details">
                <div class="detail">
                    <h4 class="h4 task">Water World</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">VB6</Chip> -->
                        <!-- <Chip size="extra-small">MS Access</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>This was my first professional project.</li>
                            <li>
                                I created a scheduling application for Water World which reduced
                                scheduling labor from 64 hours to only 24 hours every two weeks.
                            </li>
                            <li>
                                Having under-aged employees posed the additional challenge of
                                navigating labor law restrictions. This application was designed to
                                improve scheduling accuracy and efficiency for nearly 1,000
                                employees while simultaneously preventing penalties by avoiding
                                labor law violations.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Rehabilitation Services Administration</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">MS Access</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I developed a database application designed to track the treatment
                                plans for offender rehabilitation.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Quantum</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">VB6</Chip> -->
                        <!-- <Chip size="extra-small">MS Access</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                During this time period is when I created the first version of
                                Quantum (mentioned above within the section for Miapeer LLC). This
                                was my first attempt at working with fuzzy matching and predictive
                                analysis.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- --------------------------------------------- -->

        <div class="experience">
            <div class="header">
                <h3 class="h3 title">Apparatus Sales Corporation</h3>
                <div class="sub">
                    <div class="position">Tech Support I for the U.S. EPA</div>
                    <div class="timeframe">April 2001 - May 2001</div>
                    <div class="location">Denver, CO</div>
                </div>
            </div>

            <div class="details">
                <div class="detail">
                    <h4 class="h4 task">Tier-1 support</h4>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I provided comprehensive software technical support coupled with
                                education to empower users with the knowledge and assistance they
                                need for optimal software utilization.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Loaner-Equipment Tracking application</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">MS Access</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I rewrote and streamlined the "Loaner-Equipment Tracking"
                                application because I recognized that the original application was
                                practically unusable, which resulted in minimal user engagement. The
                                objective was to optimize functionality significantly, ensuring
                                improved efficiency and a more user-friendly experience.
                            </li>
                            <li>
                                This increased availability and saved time in tracking down
                                checked-out and overdue equipment by replacing the existing
                                paper-based process with an electronic process with status reports.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- --------------------------------------------- -->

        <div class="experience">
            <div class="header">
                <h3 class="h3 title">Cavion Technologies</h3>
                <div class="sub">
                    <div class="position">Tech Support I</div>
                    <div class="timeframe">October 2000 - December 2000</div>
                    <div class="location">Englewood, CO</div>
                </div>
            </div>

            <div class="details">
                <div class="detail">
                    <h4 class="h4 task">Tier-1 support</h4>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I provided basic customer support over the phone and escalated as
                                necessary.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Created the uptime report</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">Excel</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I conceptualized and developed an automated report that compiled
                                system logs and offered customers a comprehensive monthly review of
                                their services. This report provided insights into the uptime and
                                operational status of their subscriptions.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- --------------------------------------------- -->

        <div class="experience">
            <div class="header">
                <h3 class="h3 title">Echostar Communications</h3>
                <div class="sub">
                    <div class="position">Reporting Analyst</div>
                    <div class="timeframe">July 1997 - October 2000</div>
                    <div class="location">Englewood, CO</div>
                </div>
            </div>

            <div class="details">
                <div class="detail">
                    <h4 class="h4 task">Streamlined equipment refund process</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">MS Access</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                As a billing associate, I was shocked at how long it took to process
                                refunds for returned customer equipment. I found that most of the
                                time was spent waiting for inter-office paperwork delivery and
                                signatures from select personnel. In my down-time, I started working
                                on an application to electronically transmit and track progress
                                providing notifications to the appropriate individuals for their
                                "sign off".
                            </li>
                            <li>
                                I was able to reduce the refund processing time from 4-6 weeks to
                                4-5 days.
                            </li>
                            <li>
                                Through this effort, I landed a role as a Reporting Analyst and also
                                received recognition as employee of the month.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Call center processes, metrics, and reporting</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">MS Access</Chip> -->
                        <!-- <Chip size="extra-small">Excel</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                My focus in this role was on dynamic data import and export, report
                                generation, and process automation.
                            </li>
                            <li>
                                I developed and maintained dozens of Access Database applications.
                                These were used to perform business functions such as customer
                                account maintenance, equipment refunds, and credit card batch
                                reconciliation.
                            </li>
                            <li>
                                Due to the large number of databases that I worked with daily, I was
                                an instrumental asset to IT in the early preparation of the
                                company's data warehouse.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="h4 task">Management support</h4>
                    <div class="skills">
                        <!-- <Chip size="extra-small">MS Access</Chip> -->
                    </div>
                    <div class="notes">
                        <ul class="list-disc">
                            <li>
                                I provided both scheduled and ad hoc reporting support for all three
                                call center management teams.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- --------------------------------------------- -->
    </section>

    <!-- <section class="training">
        <h2 class="h2">Training</h2>
        <div class="training-list">
            <ul class="list-disc">
                <li>catapult inc. at Echostar Communications</li>
                <li>MS Access '97: Introducing, Enhancing, and Mastering - 1999</li>
                <li>Certifications</li>
                <li>MS Access 2000 Fundamentals - Brainbench.com - 2005</li>
                <li>Computer Fundamentals (Win 95/98) - Brainbench.com - 2005</li>
                <li>Math Fundamentals - Brainbench.com - 2005</li>
            </ul>
        </div>
    </section> -->

    <section class="interests">
        <h2 class="h2">Interests</h2>
        <div class="interest-list">
            <ul class="list-disc">
                <li>I always enjoy learning new development tools, techniques, and languages</li>
                <li>Home improvement - It feels great to solve a problem with your own hands</li>
                <li>I am learning to speak Tagalog</li>
                <li>I enjoy all manner of games especially card games, fighting games, and RPGs</li>
                <li>
                    I'm told that I make a mean cup of coffee (even though I don't really enjoy
                    coffee)
                </li>
                <li>Apparently, I love commas</li>
            </ul>
        </div>
    </section>
</div>

<style lang="css">
    .portfolio {
        display: grid;
        grid-template-areas:
            'contact'
            'about-me'
            'skills'
            'experience'
            'timeline'
            'interests';
        grid-template-columns: 1fr;
    }

    section:where(:not(:first-child)) {
        border-top: 1px solid rgb(var(--color-primary-500));
    }

    section {
        padding: 0 1em 1em 1em;
    }

    .personal {
        grid-area: about-me;
    }

    .contact-methods {
        grid-area: contact;
        height: fit-content;
        background-color: rgb(var(--color-surface-900));
    }

    .contact-methods i {
        width: 2em;
        text-align: center;
        line-height: 1.5em;
    }

    .skills {
        grid-area: skills;
    }

    .skills .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.2em;
    }

    .experience-list {
        grid-area: experience;
    }

    .experience-list .experience {
        border-top: 1px solid gray;
    }

    .experience-list .experience .header .sub {
        font-size: 0.7em;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }

    .experience-list .experience .detail:where(:not(:last-child))::after {
        content: '';
        display: block;
        width: 50%;
        transform: translateX(50%);
        border-bottom: 1px solid gray;
    }

    .interests {
        grid-area: interests;
    }

    h1 {
        font-size: 2em;
    }

    h2,
    h3 {
        margin-top: 1em;
    }

    h4 {
        margin-top: 0.8em;
    }

    ul > li {
        margin-left: 1em;
    }

    ul > li:where(:not(:first-child)) {
        padding-top: 1em;
    }

    @media only screen and (min-width: 800px) {
        section:where(.contact-methods, .personal) {
            border-top: none;
        }

        .portfolio {
            column-gap: 3em;
            padding: 0 3em;
            grid-template-areas:
                'about-me about-me contact'
                'skills skills contact'
                'experience experience timeline'
                'interests interests timeline';
            grid-template-columns: 1fr 1fr auto;
        }

        .contact-methods {
            position: sticky;
            top: 0;
        }

        .timeline {
            position: sticky;
            top: 200px;
            z-index: -1;
        }
    }

    @media only screen and (min-width: 1000px) {
        .experience-list .experience .header .sub {
            flex-direction: row;
            gap: 3em;
        }

        .contact-methods .contact-method,
        .personal .summary,
        .skills .chips,
        .experience-list .experience,
        .experience-list .experience .details {
            padding-left: 1em;
        }
    }
</style>
