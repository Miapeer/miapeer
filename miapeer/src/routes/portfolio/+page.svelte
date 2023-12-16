<script>
    import Chip from '$lib/Chip.svelte';
    import Link from '$lib/Link.svelte';
    import Timeline from '$lib/Timeline.svelte';
</script>

<div class="portfolio">
    <section class="contact-methods">
        <h1>Jeffery Navarra</h1>
        <div class="contact-method email">
            <i class="fa fa-envelope" />
            <Link href="mailto:jeff.navarra@miapeer.com">Jeff.Navarra@miapeer.com</Link>
        </div>
        <div class="contact-method phone">
            <i class="fa fa-mobile-alt" />
            <span>248-905-1645</span>
        </div>
        <div class="contact-method website">
            <i class="fa fa-cloud" />
            <Link href="/">miapeer.com</Link>
        </div>
    </section>
    <section class="personal">
        <h1>This page is a work-in-progress!</h1>
        <h2>A little about myself</h2>
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
        <h2>Skills</h2>
        <div class="chips">
            <Chip size="small">Python</Chip>
            <Chip size="small">C#</Chip>
            <Chip size="small">JavaScript</Chip>
            <Chip size="small">VB.Net</Chip>
            <Chip size="small">VB6</Chip>
            <Chip size="small">VBA</Chip>
            <Chip size="small">SQL Server</Chip>
            <Chip size="small">MySQL</Chip>
            <Chip size="small">PostgreSQL</Chip>
            <Chip size="small">Entity Framework</Chip>
            <Chip size="small">SQL Alchemy</Chip>
            <Chip size="small">FastAPI</Chip>
            <Chip size="small">SQLModel</Chip>
            <Chip size="small">SignalR</Chip>
            <Chip size="small">Web Sockets</Chip>
            <Chip size="small">Flask</Chip>
            <Chip size="small">NodeJS</Chip>
            <Chip size="small">ASP.NET MVC</Chip>
            <Chip size="small">KnockoutJS</Chip>
            <Chip size="small">HTML</Chip>
            <Chip size="small">CSS</Chip>
            <Chip size="small">Less</Chip>
            <Chip size="small">Bootstrap</Chip>
            <Chip size="small">jQuery</Chip>
            <Chip size="small">Azure</Chip>
            <Chip size="small">Windows Server</Chip>
            <Chip size="small">Linux</Chip>
            <Chip size="small">Git</Chip>
            <Chip size="small">React</Chip>
            <Chip size="small">MUI</Chip>
            <Chip size="small">Svelte</Chip>
            <Chip size="small">SvelteKit</Chip>
            <Chip size="small">Vite</Chip>
            <Chip size="small">Java</Chip>
            <Chip size="small">Sass</Chip>
            <Chip size="small">AWS</Chip>
            <Chip size="small">Jest</Chip>
            <Chip size="small">RTL</Chip>
            <Chip size="small">pytest</Chip>
            <Chip size="small">MS Access</Chip>
        </div>
    </section>
    <section class="timeline">
        <h2>Timeline</h2>
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
                        text: 'RSA',
                        start: {
                            month: 8,
                            year: 2007
                        },
                        end: {
                            month: 8,
                            year: 2009
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
                            month: 11,
                            year: 2004
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
        <h2 class="title-a">Experience</h2>

        <div class="experience">
            <div class="header">
                <h3 class="title">CyberGRX / ProcessUnity</h3>
                <div class="sub">
                    <div class="position">Senior Software Engineer</div>
                    <div class="timeframe">May 2021 - December 2023</div>
                    <div class="location">Denver, CO</div>
                </div>
            </div>
            <div class="details">
                <div class="detail">
                    <h4 class="task">Full-stack development of platform</h4>
                    <div class="skills">
                        <Chip size="extra-small">Python</Chip>
                        <Chip size="extra-small">React</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>Add details</li>
                            <li>Add details</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="details">
                <div class="detail">
                    <h4 class="task">Company Master initiative</h4>
                    <div class="skills">
                        <Chip size="extra-small">Python</Chip>
                        <Chip size="extra-small">React</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>Add details</li>
                            <li>Add details</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="details">
                <div class="detail">
                    <h4 class="task">Bulk ingest</h4>
                    <div class="skills">
                        <Chip size="extra-small">Python</Chip>
                        <Chip size="extra-small">React</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>Add details</li>
                            <li>Add details</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="details">
                <div class="detail">
                    <h4 class="task">Merger integration</h4>
                    <div class="skills">
                        <Chip size="extra-small">Python</Chip>
                        <Chip size="extra-small">React</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>Add details</li>
                            <li>Add details</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="experience">
            <div class="header">
                <h3 class="title">Miapeer LLC</h3>
                <div class="sub">
                    <div class="position">Founder</div>
                    <div class="timeframe">August 2015 - Present</div>
                    <div class="location">Westminster, CO</div>
                </div>
            </div>
            <div class="details">
                <div class="detail">
                    <h4 class="task">
                        Created and continually improve a financial web application
                    </h4>
                    <div class="skills">
                        <Chip size="extra-small">ASP.Net MVC</Chip>
                        <Chip size="extra-small">KnockoutJS</Chip>
                        <Chip size="extra-small">SignalR</Chip>
                        <Chip size="extra-small">SQL Azure</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>Built to assist people with financial tracking and budgeting</li>
                            <li>
                                This project was born out of necessity when other financial
                                applications lacked features that I needed for my own money
                                management. The original version was a desktop application written
                                in VB6. The current version is web-based, using KnockoutJS and
                                SignalR. I still use this for my personal finances to this day.
                            </li>
                            <li>
                                Continuous deployment via Azure DevOps and Azure Container Registry
                            </li>
                            <!-- <li>
                                Feel free to take it for a spin: &nbsp;<a
                                class="hover-underline"
                                href="https://quantum.miapeer.com"
                                target="_blank">Quantum</a
                                >
                                <ul>
                                    <li>User name: demo@miapeer.com</li>
                                    <li>Password: demo</li>
                                </ul>
                            </li> -->
                        </ul>
                    </div>
                </div>
                <!-- <div class="detail">
                    <h4 class="task">Old resumè</h4>
                    <div class="skills" />
                    <div class="notes">
                        <ul>
                            <li>
                                I created a scheduling application for Water World which reduced
                                scheduling labor by 50% while increasing schedule accuracy and
                                efficiency for nearly 1,000 employees
                            </li>
                            <li>
                                I created an electronic timecard system which integrated with
                                existing account tools
                            </li>
                            <li>
                                Influenced and led effort to move on-premesis products to the cloud
                            </li>
                            <li>quick learner</li>
                            <li>reputation of efficiency, integrity, and high quality of work</li>
                            <li>self-starting and sustaining</li>
                            <li>
                                always looking for new skills and toold to improve products and
                                processes
                            </li>
                            <li>Reporting analyst - Echostar - Englewood, CO - 7-1997 > 10-2000</li>
                            <li>works well under pressure</li>
                            <li>
                                quick learner with reputation for efficiency and high quality of
                                work
                            </li>
                            <li>works well in teamwork enviroment</li>
                            <li>excellent customer service skills</li>
                            <li>strong oral and writtent communication skills</li>
                            <li>blue lizard software llc - 2-1998 - ???</li>
                            <li />
                            <li>software developer and co-owner</li>
                            <li>creating an automated employee-scheduling application</li>
                            <li>
                                minimizing company expenses (about 64 man-hours reduced to 24, every
                                two weeks
                            </li>
                            <li>
                                increasing schedule accuracy and efficiency for nearly one thousand
                                employees
                            </li>
                            <li>apparatus sales corporation for the U.S. EPA - 4-2001 - 5-2001</li>
                            <li>software technical support and training</li>
                            <li>
                                re-wrote and streamlined "Loaner-Equipment Tracking" application
                            </li>
                            <li>saved time in tracking down checked-out equipment</li>
                            <li>increaded availability of equipment</li>
                            <li>cavion technologies - 10-2000 - 12-2000</li>
                            <li>echostar communications corporation</li>
                            <li>reporting analyst</li>
                            <li>
                                provided support for company's backend Customer Management Center
                            </li>
                            <li>Developed and maintained dozens of Access Database applications</li>
                            <li>
                                Focused on dynamic data import and export, report generation and
                                process automation
                            </li>
                            <li>assisted in early preparation of data warehouse</li>
                            <li>training</li>
                            <li>catapult inc. at Echostar Communications</li>
                            <li>MS Access '97: Introducing, Enhancing, and Mastering - 1999</li>
                            <li>Certifications</li>
                            <li>MS Access 2000 Fundamentals - Brainbench.com - 2005</li>
                            <li>Computer Fundamentals (Win 95/98) - Brainbench.com - 2005</li>
                            <li>Math Fundamentals - Brainbench.com - 2005</li>
                            <li />
                            <li>
                                As my first professional project, I created an automated employee
                                scheduling application for an amusement park. Having under-aged
                                employees posed the additional challenge of navigating labor law
                                restrictions. This application was developed to improve scheduling
                                efficiency, and simultaneously prevent penalties by avoiding labor
                                law violations.
                            </li>
                        </ul>
                    </div>
                </div> -->
                <div class="detail">
                    <h4 class="task">Work with clients to bring solutions to market</h4>
                    <div class="skills">
                        <Chip size="extra-small">ASP.Net MVC</Chip>
                        <Chip size="extra-small">KnockoutJS</Chip>
                        <Chip size="extra-small">SignalR</Chip>
                        <Chip size="extra-small">SQL Azure</Chip>
                        <Chip size="extra-small">WordPress</Chip>
                        <Chip size="extra-small">PHP</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>
                                I've held two contracts for the full development and deployment of
                                web applications. One application is currently in production
                                (Nussentials), while the other has moved into beta (MyExReportCard).
                            </li>
                            <li>From consulting to complete web applications</li>
                            <li>Clients include: RSA, Courtesy Services, Nussentials</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="experience">
            <div class="header">
                <h3 class="title">Webroot / Carbonite / OpenText</h3>
                <div class="sub">
                    <div class="position">Senior Software Engineer</div>
                    <div class="timeframe">April 2018 - May 2021</div>
                    <div class="location">Broomfield, CO</div>
                </div>
            </div>
            <div class="details">
                <div class="detail">
                    <h4 class="task">Research and development of Company Master initiative</h4>
                    <div class="skills">
                        <Chip size="extra-small">Python</Chip>
                        <Chip size="extra-small">SQL Server</Chip>
                        <Chip size="extra-small">Git</Chip>
                        <Chip size="extra-small">React</Chip>
                        <Chip size="extra-small">PHP</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>
                                I developed a new process for fuzzy name and address matching to improve identification of duplicate and prevent duplicate companies from being created in the database.
                            </li>
                            <li>
                                I evaluated and implemented various APIs and algorithms such as Google Places API, weighted scoring, and a new architecture for deriving and searching alternate names.
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="detail">
                    <h4 class="task">Continued improvement of eCommerce systems</h4>
                    <div class="skills">
                        <Chip size="extra-small">SQL Server</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>
                                I extended functionality and debugged business logic within the database schema. This included customer data, subscriptions, billing, orders, website routing, and more.
                            </li>
                            <li>
                                I received reports and performed production data support for customers and product licenses in order to keep the data clean and processes running smoothly.
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="detail">
                    <h4 class="task">Marketo person import process</h4>
                    <div class="skills">
                        <Chip size="extra-small">Python</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>
                                I worked with the marketing department to create a more efficient person import process to assist in the transition from Eloqua to Marketo. This carried forward to allow the rapid import of marketing contact lists.
                            </li>
                            <li>
                                The updated process performed data validation and normalization of 500k records every month, which improved processing time from 45 days to 1 hour.
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="detail">
                    <h4 class="task">Front-end development</h4>
                    <div class="skills">
                        <Chip size="extra-small">React</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>
                                I improved the user's search experience by incorporating Google's Geolocation service to allow for more casual address input.
                            </li>
                            <li>
                                I updated the email marketing opt-out form to use React. This work also helped prevent potential data-mining by providing the user with a generic message and performing the appropriate validation at the database.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="experience">
            <div class="header">
                <h3 class="title">AlphaTRAC, Inc</h3>
                <div class="sub">
                    <div class="position">Senior Software Engineer</div>
                    <div class="timeframe">February 2006 - February 2018</div>
                    <div class="location">Westminster, CO</div>
                </div>
            </div>
            <div class="details">
                <div class="detail">
                    <h4 class="task">
                        Department of Energy Emergency Planning Hazards Assessment (EPHA) automation from client data to final report output
                    </h4>
                    <div class="skills">
                        <Chip size="extra-small">C#</Chip>
                        <Chip size="extra-small">VB.Net</Chip>
                        <Chip size="extra-small">VB6</Chip>
                        <Chip size="extra-small">SQL Server</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>
                                I was tasked with the maintenance and future development of the in-house software used to generate emergency management reports. I took this app through multiple iterations as a developer-only took to something that analysts could pilot themselves. The original version was written in VB6, used a substantial amount of Excel/Word automation, and my focus was to keep that application running while working to replace the VB6 elements with C#. Years later, the project was reborn again using NodeJS and Python (See CAPARS below).
                            </li>
                            <li>
                                I worked with analysts and scientists to customize the requested EPHA reports to fit client needs.
                            </li>
                            <li>
                                I pioneered and implemented an approximation algorithm for chemical Threshold Screening Quantity calculation to improve accuracy and reduce unnecessary analysis.
                            </li>
                            <li>
                                I increased the performance and precision of EPIcode and Hotspot automation tools, including the creation of a tool to combine multiple outputs into a single mixture.
                            </li>
                            <li>
                                I developed a tool to calculate the evaporation of puddles of hazardous materials using client inventory.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="task">
                        Lead developer of CAPARS (Computer Assisted Protective Action Recommendation System) emergency management reponse and reporting application
                    </h4>
                    <div class="skills">
                        <Chip size="extra-small">Python</Chip>
                        <Chip size="extra-small">NodeJS</Chip>
                        <Chip size="extra-small">KnockoutJS</Chip>
                        <Chip size="extra-small">MySQL</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>
                                I maintained and updated the original version, which is still in production. Notably, I solved recurring client network security conflicts which impeded system communication by streamlining from a dual server configuration to a single server with a hosted virtual machine. This had the additional benefit of simplifying server administration and deployment. In addition, I enhanced the wind field applet to be user configurable which allowed for faster custom client deployments
                            </li>
                            <li>
                                I created the next generation version for EPHA generation using new dispersion/consequence assessment modeling methodology. This performed modeling using real meteorological data from the site rather than theoretical wind conditions with simple straight-line models to more accurately reflect dispersion through complex terrain. The application was designed for parallelized and distributed computing with the intent to utilize the full processing power of a multi-core system and allow additional machines to "subscribe" in order to assist with the workload.
                            </li>
                            <li>
                                I recommended and custom built real-time emergency response and consequence analysis servers to client specifications and budget. On these servers I performed server administration including OS upgrades, repairs, and security updates.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="task">
                        Interactive emergency response training software (AlphaACT)
                    </h4>
                    <div class="skills">
                        <Chip size="extra-small">ASP.Net MVC</Chip>
                        <Chip size="extra-small">KnockoutJS</Chip>
                        <Chip size="extra-small">Entity Framework</Chip>
                        <Chip size="extra-small">SQL Azure</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>
                                This was originally developed as a desktop application for analysis and production of Protective Action Plans. It later expanded into a web-based crisis decision training platform for first responders.
                                I prepared the application for demo at EMI SIG after which I received special recognition for creating a Minimum Viable Product (MVP) system in an extremely short period of time.
                            </li>
                            <li>
                                I worked with an external company to evaluate the integration of their pattern recognition engine (PRE). This effort eventually turned towards developing a custom PRE in-house to drive the system to a definitive answer as quickly as possible.
                                I also collaborated with external software teams to integrate the AlphaTRAC system into their custom user interfaces and Learning Management Systems (LMS).
                            </li>
                            <li>
                                It originally handled chemical and radiological hazard scenarios for the Department of Energy and grew to serve additional fields including the Marine Corps, fire service, rail operations, and law enforcement.
                            </li>
                            <li>
                                It was deployed to Azure but could optionally be installed on-premise in order to protect sensitive data.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="task">Experience gathering platform (XCapture)</h4>
                    <div class="skills">
                        <Chip size="extra-small">ASP.Net MVC</Chip>
                        <Chip size="extra-small">KnockoutJS</Chip>
                        <Chip size="extra-small">Entity Framework</Chip>
                        <Chip size="extra-small">SQL Azure</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>
                                I developed this web application and REST API for converting SME after-action reports into training scenarios for AlphaACT, designed to be adaptable for various fields and implementations.
                            </li>
                            <li>
                                Additionally, I created an Android version of the application, enabling offline deployment to remote locations.
                            </li>
                            <li>
                                The project involved a question-and-answer style experience-gathering interview for transforming SME after-action reports into training scenarios.
                            </li>
                            <li>
                                I worked in collaboration with external teams, such as the IAFC (International Association of Fire Chiefs), to integrate the XCapture API with their user interface.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="task">
                        Implementation, refinement, and upkeep of several software processes and operations
                    </h4>
                    <div class="skills">
                        <Chip size="extra-small">Azure</Chip>
                        <Chip size="extra-small">Jira</Chip>
                        <Chip size="extra-small">Slack</Chip>
                        <Chip size="extra-small">Quickbooks</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>
                                When the company shifted to a fully remote workforce, I played a key role by migrating the business's systems, infrastructure, and operations. This included moving web applications to Microsoft Azure, transferring company services to their cloud-based counterparts, and implementing other collaborative tools.
                            </li>
                            <li>
                                I set up and administered an on-premises installation of Jira for issue management and process workflow adherence.
                            </li>
                            <li>
                                I worked on a company IEEE-compliance committee for Software Quality Assurance. This included implementing processes and writing system documentation.
                            </li>
                            <li>
                                Government contracts came with time-tracking and administrative requirements, which off-the-shelf software couldn't meet. I created an Excel-based timecard solution to improve accuracy between accounting, project managers, and employees. This timecard system was used daily by every employee for over 10 years.
                            </li>
                            <li>
                                I managed the evolution of our source code and company documentation from CVS to Subversion and then later split them to more the more modern specialty tools, Git and Sharepoint
                            </li>
                            <li>
                                I became the primary individual responsible for any IT issues that came up. I built, purchased, and maintained workstations and servers, upgraded the network infrastructure, and implemented security protocols.
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="task">Windows Server, Linux, and Azure administration</h4>
                    <div class="skills">
                        <Chip size="extra-small">zzz</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>zzz</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="interests">
        <h2>Interests</h2>
        <div class="interest-list">
            <ul>
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

<style lang="scss">
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
        border-top: 1px solid var(--text-accent);
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
        background-color: var(--bg-primary);

        i {
            width: 2em;
            text-align: center;
            line-height: 1.5em;
        }
    }

    .skills {
        grid-area: skills;

        .chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.2em;
        }
    }

    .experience-list {
        grid-area: experience;

        .experience {
            border-top: 1px solid var(--text-primary);

            .header .sub {
                font-size: 0.7em;
                display: flex;
                justify-content: flex-start;
                flex-direction: column;
            }

            .detail:where(:not(:last-child))::after {
                content: '';
                display: block;
                width: 50%;
                transform: translateX(50%);
                border-bottom: 1px solid var(--text-primary-negative);
            }
        }
    }

    .interests {
        grid-area: interests;
    }

    h1 {
        font-size: 2em;
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
