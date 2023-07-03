<script>
    import Chip from '$lib/Chip.svelte';
    import Link from '$lib/Link.svelte';
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
        <h2>A little about myself</h2>
        <div class="summary">
            I'm a software engineer with over 20 years of experience. Most of my experience has been
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
        </div>
    </section>
    <section class="timeline">
        <h2>Timeline</h2>
        <div class="container">
            <div class="left" />
            <div class="right" />
        </div>
    </section>
    <section class="experience-list">
        <h2 class="title-a">Experience</h2>

        <div class="experience">
            <div class="header">
                <h3 class="title">CyberGRX</h3>
                <div class="sub">
                    <div class="position">Senior Software Engineer</div>
                    <div class="timeframe">May 2021 - Present</div>
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
                            <li>Continuous deployment via Azure DevOps</li>
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
                                Developed a process for fuzzy name and address matching to improve
                                duplicate identification and prevention
                            </li>
                            <li>
                                Implemented various APIs and algorithms such as Google Places API,
                                weighted scoring, and a new architecture for deriving alternate
                                names
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
                            <li>Production data support for customers and product licenses</li>
                            <li>
                                Extend functionality and debug business logic within database schema
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
                                Created a more efficient person import process for the marketing
                                department
                            </li>
                            <li>
                                Data validation and normalization of 500k records every month
                                improved from 45 days to 1 hour
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
                                Created a more efficient person import process for the marketing
                                department
                            </li>
                            <li>
                                Data validation and normalization of 500k records every month
                                improved from 45 days to 1 hour
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
                        Department of Energy Emergency Planning Hazards Assessment (EPHA) automation
                        from client data to final report output
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
                                Migrated legacy developer-centric tools for generating EPHA
                                documentation through several major upgrades into more modern
                                applications suitable for use directly by analysts
                            </li>
                            <li>
                                Department of Energy EPHA automation from client data to final
                                report output
                            </li>
                            <li>
                                Worked with analysts and scientists to customize reports to fit
                                client needs
                            </li>
                            <li>
                                Implemented approximation algorithm for chemical Threshold Screening
                                Quantity calculation
                            </li>
                            <li>Source Term calculation, dispersion, consequence analysis</li>
                            <li>Hazard Screening, Hazard Analysis, and EALs</li>
                            <li>Various hazard classes (chemical, radiological, biological)</li>
                            <li>
                                Increased performance and precision of EPIcode and Hotspot
                                automation tools
                            </li>
                            <li>
                                Created a tool to combine multiple Hotspot outputs into a single
                                radiological mixture
                            </li>
                            <li>
                                Development for tool to calculate evaporation of puddles of
                                hazardous materials
                            </li>
                            <li>Development for tool to produce Protective Action Plans</li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="task">
                        Lead developer of CAPARS (Computer Assisted Protective Action Recommendation
                        System) emergency management reponse and reporting application
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
                                Solved recurring client network security communication issue while
                                simultaneously simplifying server administration and deployment by
                                streamlining from a dual server configuration to a single server
                                with a hosted virtual machine
                            </li>
                            <li>Enhanced wind field applet and made user configurable</li>
                            <li>Server administration including OS upgrades and security</li>
                            <li>
                                Modeling using real meteorological data from the site rather than
                                theoretical wind conditions with simple straight-line models to more
                                accurately reflect dispersion through complex terrain
                            </li>
                            <li>Designed for parallelized and distributed computing</li>
                            <li>Designed to be machine agnostic</li>
                            <li>Recommended and custom built servers to client specifications</li>
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
                                Developed this web-based crisis decision training application for
                                first responders
                            </li>
                            <li>
                                Worked with external companies to develop and evaluate pattern
                                recognition engines
                            </li>
                            <li>
                                Demoed at EMI SIG after which I received special recognition for
                                creating a working system in an extremely short period of time
                            </li>
                            <li>
                                Eventually grew beyond chemical and radiological hazard scenarios
                                into a training/evaluation platform
                            </li>
                            <li>
                                Deployed to a variety of fields including Dept of Energy, Marine
                                Corps, fire, rail, and law enforcement
                            </li>
                            <li>
                                Designed for use in Azure, or on-premise for control of sensitive
                                data
                            </li>
                            <li>
                                Collaborated with external software team to allow them to connect
                                their own custom UI to the RESTful API
                            </li>
                            <li>Collaborated with external teams to connect to their LMS</li>
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
                                Developed web app and REST API to convert SME after-action reports
                                into training scenarios for AlphaACT
                            </li>
                            <li>
                                Designed to be data-driven and adaptable for multiple
                                implementations and fields
                            </li>
                            <li>Collaborated with external team to connect their custom UI</li>
                            <li>
                                Created Android version to allow offline deployment to remote
                                locations
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="task">Migrated infrastructure and operations to the cloud</h4>
                    <div class="skills">
                        <Chip size="extra-small">Azure</Chip>
                        <Chip size="extra-small">Jira</Chip>
                        <Chip size="extra-small">Slack</Chip>
                        <Chip size="extra-small">Quickbooks</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>Facilitated transition to a remote workforce</li>
                            <li>Deployed web applications and databases to Microsoft Azure</li>
                            <li>
                                Transferred company services to their cloud-based counterparts like
                                QuickBooks, Jira, and Azure DevOps
                            </li>
                            <li>
                                Implemented other collaborative tools such as Slack and Screenhero
                            </li>
                            <li>Migrated source control management to Git</li>
                        </ul>
                    </div>
                </div>

                <div class="detail">
                    <h4 class="task">
                        Assisted with implementation and refinement of agile and scrum methodologies
                    </h4>
                    <div class="skills">
                        <Chip size="extra-small">zzz</Chip>
                    </div>
                    <div class="notes">
                        <ul>
                            <li>
                                JIRA implementation for waterfall (and later for agile) including
                                workflows and Kanban
                            </li>
                            <li>Implemented IEEE standard for Software Quality Assurance</li>
                            <li>
                                In addition, I implemented several software processes including
                                Software Quality Assurance using IEEE standards, source control with
                                Git, and issue management and agile methodology with JIRA.
                            </li>
                            <li>Windows Server, Linux, and Azure administration</li>
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
    .timeline {
        height: fit-content;

        .container {
            display: grid;
            grid-template-columns: 1fr 1fr;

            .left {
                outline: 1px solid red;
                height: 100px;
            }

            .right {
                outline: 1px solid green;
                height: 100px;
            }
        }
    }

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
