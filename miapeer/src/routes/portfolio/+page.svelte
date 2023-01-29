<script>
    // import Button, { Icon } from '@smui/button';
    // import Chip, { Set, Text } from '@smui/chips';
</script>

<div class="portfolio">
    <div class="two_thirds">
        <section class="personal">
            <h1><i class="material-icons">construction</i> Under Construction</h1>
            <div>Still need some image in here somewhere as an overlay - redRocksBackground</div>

            <h1>Jeffery Navarra</h1>
            <div class="separator" />
            <p>
                I’m a software engineer with over 20 years of experience. Most of my experience has
                been centered around emergency management for multiple clients within the Department
                of Energy. I've worked primarily with the Microsoft stack, but more recently with
                Python. For me, puzzle-solving is part of the appeal of discovering software
                solutions. I am hard-working, self-motivated, and passionate about software
                development. I’m always looking to learn new skills to add to my toolbelt.
            </p>
        </section>
        <section class="skills">
            <h3>Skills</h3>
            <Set
                chips={[
                    'Python',
                    'C#',
                    'JavaScript',
                    'VB.Net',
                    'VB6',
                    'SQL Server',
                    'MySQL',
                    'Entity Framework',
                    'SQL Alchemy',
                    'SignalR',
                    'Web Sockets',
                    'Flask',
                    'NodeJS',
                    'ASP.NET MVC',
                    'KnockoutJS',
                    'HTML',
                    'CSS',
                    'Less',
                    'Bootstrap',
                    'jQuery',
                    'Azure',
                    'Windows Server',
                    'Linux',
                    'Git',
                    'React',
                    'MUI',
                    'Svelte',
                    'SvelteKit',
                    'Vite',
                    'Java',
                    'Sass',
                    'AWS',
                    'Jest',
                    'RTL',
                    'pytest'
                ]}
                let:chip
                nonInteractive
            >
                <Chip {chip}>
                    <Text>{chip}</Text>
                </Chip>
            </Set>
        </section>
        <section class="experience">
            <div class="experience">
                <h3 class="title-a">Experience</h3>
                <div class="experience-list py10">
                    <div class="row col-p0 mb10 max_height xs_max_height">
                        <div class="col-xs-12 col-sm-4 col-lg-3">
                            <div class="box-services-4 dark el_max_height">
                                <div class="bg-overlay" />
                                <div class="row col-p0">
                                    <div class="col-sm-12">
                                        <h3 class="title title-small mb0">Webroot / OpenText</h3>
                                        <p class="mb0">Senior Software Engineer</p>
                                        <p class="mb0">April 2018 – Present</p>
                                        <p class="mb0">Broomfield, CO</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-8 col-lg-9">
                            <div class="box-services-4 transparent el_max_height">
                                <div class="row col-p0">
                                    <div class="col-sm-12 color-default">
                                        <h4 class="title-small mb0">
                                            Research and development of Company Master initiative
                                        </h4>
                                        <div class="tags py10">
                                            <a>SQL Server</a>
                                            <a>Python</a>
                                            <a>PHP</a>
                                        </div>
                                        <ul>
                                            <li>
                                                Developed a process for fuzzy name and address
                                                matching to improve duplicate identification and
                                                prevention
                                            </li>
                                            <li>
                                                Implemented various APIs and algorithms such as
                                                Google Places API, weighted scoring, and a new
                                                architecture for deriving alternate names
                                            </li>
                                        </ul>

                                        <div class="mb30" />

                                        <h4 class="title-small mb0">
                                            Continued improvement of eCommerce systems
                                        </h4>
                                        <div class="tags py10">
                                            <a>SQL Server</a>
                                        </div>
                                        <ul>
                                            <li>
                                                Production data support for customers and product
                                                licenses
                                            </li>
                                            <li>Extend functionality and debug business logic</li>
                                        </ul>

                                        <div class="mb30" />

                                        <h4 class="title-small mb0">
                                            Marketo person import process
                                        </h4>
                                        <div class="tags py10">
                                            <a>Python</a>
                                        </div>
                                        <ul>
                                            <li>
                                                Created a more efficient person import process for
                                                the marketing department
                                            </li>
                                            <li>
                                                Data validation and normalization of 500k records
                                                every month improved from 45 days to 1 hour
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row col-p0 mb10 max_height xs_max_height">
                        <div class="col-xs-12 col-sm-4 col-lg-3">
                            <div class="box-services-4 dark el_max_height">
                                <div class="bg-overlay" />
                                <div class="row col-p0">
                                    <div class="col-sm-12">
                                        <h3 class="title title-small">Miapeer</h3>
                                        <p class="mb0">Founder</p>
                                        <p class="mb0">August 2015 - Present</p>
                                        <p class="mb0">Westminster, CO</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-8 col-lg-9">
                            <div class="box-services-4 transparent el_max_height">
                                <div class="row col-p0">
                                    <div class="col-sm-12 color-default">
                                        <h4 class="title-small mb0">
                                            Created and continually improve a financial web
                                            application
                                        </h4>
                                        <div class="tags py10">
                                            <a>ASP.Net MVC</a>
                                            <a>KnockoutJS</a>
                                            <a>SignalR</a>
                                            <a>SQL Azure</a>
                                        </div>
                                        <ul>
                                            <li>
                                                Built to assist people with financial tracking and
                                                budgeting
                                            </li>
                                            <li>Continuous deployment via Azure DevOps</li>
                                            <li>
                                                Feel free to take it for a spin: &nbsp;<a
                                                    class="hover-underline"
                                                    href="https://quantum.miapeer.com"
                                                    target="_blank">Quantum</a
                                                >
                                                <ul>
                                                    <li>User name: demo@miapeer.com</li>
                                                    <li>Password: demo</li>
                                                </ul>
                                            </li>
                                        </ul>

                                        <div class="mb30" />

                                        <h4 class="title-small mb0">
                                            Work with clients to bring solutions to market
                                        </h4>
                                        <div class="tags py10">
                                            <a>ASP.Net MVC</a>
                                            <a>KnockoutJS</a>
                                            <a>SignalR</a>
                                            <a>SQL Azure</a>
                                            <a>WordPress</a>
                                            <a>PHP</a>
                                        </div>
                                        <ul>
                                            <li>From consulting to complete web applications</li>
                                            <li>
                                                Clients include: RSA, Courtesy Services, Nussentials
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row col-p0 mb10 max_height xs_max_height">
                        <div class="col-xs-12 col-sm-4 col-lg-3">
                            <div class="box-services-4 dark el_max_height">
                                <div class="bg-overlay" />
                                <div class="row col-p0">
                                    <div class="col-sm-12">
                                        <h3 class="title title-small">AlphaTRAC</h3>
                                        <p class="mb0">Senior Software Engineer</p>
                                        <p class="mb0">February 2006 - February 2018</p>
                                        <p class="mb0">Westminster, CO</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-8 col-lg-9">
                            <div class="box-services-4 transparent el_max_height">
                                <div class="row col-p0">
                                    <div class="col-sm-12 color-default">
                                        <h4 class="title-small mb0">
                                            Emergency Planning Hazards Assessment
                                        </h4>
                                        <div class="tags py10">
                                            <a>C#</a>
                                            <a>VB.Net</a>
                                            <a>VB6</a>
                                            <a>SQL Server</a>
                                        </div>
                                        <ul>
                                            <li>
                                                Migrated legacy developer-centric tools for
                                                generating EPHA documentation through several major
                                                upgrades into more modern applications suitable for
                                                use directly by analysts
                                            </li>
                                            <li>
                                                Department of Energy EPHA automation from client
                                                data to final report output
                                            </li>
                                            <li>
                                                Worked with analysts and scientists to customize
                                                reports to fit client needs
                                            </li>
                                            <li>
                                                Implemented approximation algorithm for chemical
                                                Threshold Screening Quantity calculation
                                            </li>
                                            <li>
                                                Source Term calculation, dispersion, consequence
                                                analysis
                                            </li>
                                            <li>Hazard Screening, Hazard Analysis, and EALs</li>
                                            <li>
                                                Various hazard classes (chemical, radiological,
                                                biological)
                                            </li>
                                            <li>
                                                Increased performance and precision of EPIcode and
                                                Hotspot automation tools
                                            </li>
                                            <li>
                                                Created a tool to combine multiple Hotspot outputs
                                                into a single radiological mixture
                                            </li>
                                            <li>
                                                Development for tool to calculate evaporation of
                                                puddles of hazardous materials
                                            </li>
                                            <li>
                                                Development for tool to produce Protective Action
                                                Plans
                                            </li>
                                        </ul>

                                        <div class="mb30" />

                                        <h4 class="title-small mb0">
                                            Lead developer of CAPARS (Computer Assisted Protective
                                            Action Recommendation System) emergency management
                                            reponse and reporting application
                                        </h4>
                                        <div class="tags py10">
                                            <a>Python</a>
                                            <a>NodeJS</a>
                                            <a>KnockoutJS</a>
                                            <a>MySQL</a>
                                        </div>
                                        <ul>
                                            <li>
                                                Real-time response system
                                                <ul>
                                                    <li>
                                                        Solved recurring client network security
                                                        communication issue while simultaneously
                                                        simplifying server administration and
                                                        deployment by streamlining from a dual
                                                        server configuration to a single server with
                                                        a hosted virtual machine
                                                    </li>
                                                    <li>
                                                        Enhanced wind field applet and made user
                                                        configurable
                                                    </li>
                                                    <li>
                                                        Server administration including OS upgrades
                                                        and security
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                Consequence assessment
                                                <ul>
                                                    <li>
                                                        Modeling using real meteorological data from
                                                        the site rather than theoretical wind
                                                        conditions with simple straight-line models
                                                        to more accurately reflect dispersion
                                                        through complex terrain
                                                    </li>
                                                    <li>
                                                        Designed for parallelized and distributed
                                                        computing
                                                    </li>
                                                    <li>Designed to be machine agnostic</li>
                                                </ul>
                                            </li>
                                            <li>
                                                Recommended and custom built servers to client
                                                specifications
                                            </li>
                                        </ul>

                                        <div class="mb30" />

                                        <h4 class="title-small mb0">
                                            Interactive emergency response training software
                                            (AlphaACT)
                                        </h4>
                                        <div class="tags py10">
                                            <a>ASP.Net MVC</a>
                                            <a>KnockoutJS</a>
                                            <a>Entity Framework</a>
                                            <a>SQL Azure</a>
                                        </div>
                                        <ul>
                                            <li>
                                                Developed this web-based crisis decision training
                                                application for first responders
                                            </li>
                                            <li>
                                                Worked with external companies to develop and
                                                evaluate pattern recognition engines
                                            </li>
                                            <li>
                                                Demoed at EMI SIG after which I received special
                                                recognition for creating a working system in an
                                                extremely short period of time
                                            </li>
                                            <li>
                                                Eventually grew beyond chemical and radiological
                                                hazard scenarios into a training/evaluation platform
                                            </li>
                                            <li>
                                                Deployed to a variety of fields including Dept of
                                                Energy, Marine Corps, fire, rail, and law
                                                enforcement
                                            </li>
                                            <li>
                                                Designed for use in Azure, or on-premise for control
                                                of sensitive data
                                            </li>
                                            <li>
                                                Collaborated with external software team to allow
                                                them to connect their own custom UI to the RESTful
                                                API
                                            </li>
                                            <li>
                                                Collaborated with external teams to connect to their
                                                LMS
                                            </li>
                                        </ul>

                                        <div class="mb30" />

                                        <h4 class="title-small mb0">
                                            Experience gathering platform (XCapture)
                                        </h4>
                                        <div class="tags py10">
                                            <a>ASP.Net MVC</a>
                                            <a>KnockoutJS</a>
                                            <a>Entity Framework</a>
                                            <a>SQL Azure</a>
                                        </div>
                                        <ul>
                                            <li>
                                                Developed web app and REST API to convert SME
                                                after-action reports into training scenarios for
                                                AlphaACT
                                            </li>
                                            <li>
                                                Designed to be data-driven and adaptable for
                                                multiple implementations and fields
                                            </li>
                                            <li>
                                                Collaborated with external team to connect their
                                                custom UI
                                            </li>
                                            <li>
                                                Created Android version to allow offline deployment
                                                to remote locations
                                            </li>
                                        </ul>

                                        <div class="mb30" />

                                        <h4 class="title-small mb0">
                                            Migrated infrastructure and operations to the cloud
                                        </h4>
                                        @*
                                        <div class="tags py10">
                                            <a>Azure</a>
                                            <a>Jira</a>
                                            <a>Slack</a>
                                            <a>Quickbooks</a>
                                        </div>
                                        *@
                                        <ul>
                                            <li>Facilitated transition to a remote workforce</li>
                                            <li>
                                                Deployed web applications and databases to Microsoft
                                                Azure
                                            </li>
                                            <li>
                                                Transferred company services to their cloud-based
                                                counterparts like QuickBooks, Jira, and Azure DevOps
                                            </li>
                                            <li>
                                                Implemented other collaborative tools such as Slack
                                                and Screenhero
                                            </li>
                                            <li>Migrated source control management to Git</li>
                                        </ul>

                                        @*
                                        <div class="mb30" />

                                        <h4 class="title-small mb0">
                                            Assisted with implementation and refinement of agile and
                                            scrum methodologies
                                        </h4>
                                        <div class="tags py10">
                                            <a>zzz</a>
                                        </div>
                                        <ul>
                                            <li>
                                                JIRA implementation for waterfall (and later for
                                                agile) including workflows and Kanban
                                            </li>
                                        </ul>
                                        <ul />
                                        <ul />
                                        <ul>
                                            <li>
                                                Implemented IEEE standard for Software Quality
                                                Assurance
                                            </li>

                                            <li>
                                                In addition, I implemented several software
                                                processes including Software Quality Assurance using
                                                IEEE standards, source control with Git, and issue
                                                management and agile methodology with JIRA.
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>Windows Server, Linux, and Azure administration</li>
                                        </ul>
                                        *@
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="interests">
            <h3 class="title-a">Interests</h3>
            <div class="interest-list">
                <ul>
                    <li>
                        I always enjoy learning new development tools, techniques, and languages
                    </li>
                    <li>
                        Home improvement - It feels great to solve a problem with your own hands
                    </li>
                    <li>
                        I’m told that I make a mean cup of coffee (even though I don’t really enjoy
                        coffee)
                    </li>
                    <li>Apparently, I love commas</li>
                </ul>
            </div>
        </section>
    </div>
    <div class="one_third">
        <div class="contact-methods">
            <h3>Contact</h3>
            <div class="contact-method email">
                <i class="material-icons">mail_outline</i>
                <a
                    href="mailto://jeff.navarra@miapeer.com"
                    class="plain hover-underline"
                    target="_blank">Jeff.Navarra@miapeer.com</a
                >
            </div>
            <div class="contact-method phone">
                <i class="material-icons">phone</i>
                <span>248-905-1645</span>
            </div>
            <div class="contact-method website">
                <i class="material-icons">public</i>
                <a href="/" class="plain hover-underline">miapeer.com</a>
            </div>
        </div>
    </div>
</div>

<style>
    .portfolio {
        padding: 3rem;
        display: flex;
    }

    .two_thirds {
        border: 1px solid red;
        width: 66.5%;
    }

    .one_third {
        border: 1px solid green;
        width: 33.5%;
    }

    .contact-methods {
        margin: 2rem 0 0 2rem;
    }

    .contact-method {
        margin: 1rem 0 0 2rem;
    }

    .contact-method i {
        color: var(--color-text-darker);
        width: 1rem;
        margin-right: 0.5rem;
    }

    .phone {
        color: var(--color-text-dark);
    }
</style>
