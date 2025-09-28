// components/AcmeUniversity.tsx
'use client';

import React from 'react';
import { 
  FiCheck, 
  FiClock, 
  FiDollarSign, 
  FiUsers, 
  FiTrendingUp, 
  FiHome, 
  FiBook, 

  FiMail, 
  FiPhone,
  FiArrowRight,
  FiGlobe,
  FiAward,
  FiBriefcase,

} from 'react-icons/fi';

const AcmeUniversity = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Header */}
     

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBEuAvUy5aE3s1-FUmYxvYifm1K5mVJyGeIhyY-nW48GzHBJRkzg_Wuhfg0b5i5MlySkr6kW8hwJmiBw-oUBKEUW_JbZFWD02Pknz0VjxLkWdWohqxpq0VzyVfPeTvk0gIANtgDs1VfqHW64ZhqE9U8WyM0TcLc-xkXMU_z1aJ_9pFScVJyQlEBxzhqTxx9E8c6MgwgKracTOCgD8LoZz0KU7dKNScS030gI7vGPlEGmzGp4upxN0I0P_W6w9sf44xpRTH1R6pfZCQ")'
            }}
          />
          <div className="relative container mx-auto px-4 py-20 lg:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Unlock Your Potential at{' '}
                <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Acme University
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8 max-w-3xl mx-auto">
                Embark on a transformative educational journey with our diverse programs and supportive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:-translate-y-1 shadow-lg">
                  Explore Programs
                </button>
                <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                  Virtual Tour
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <FiUsers className="w-8 h-8" />, label: 'Students Enrolled', value: '10,000+', description: 'Active learners worldwide' },
                { icon: <FiTrendingUp className="w-8 h-8" />, label: 'Growth Rate', value: '65%', description: 'Year-over-year growth' },
                { icon: <FiHome className="w-8 h-8" />, label: 'Colleges', value: '25+', description: 'Specialized institutions' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</p>
                  <p className="text-gray-500">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">About Acme University</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Acme University is dedicated to providing a world-class education that empowers students to excel in their chosen fields. Our commitment to innovation, research, and community engagement creates a vibrant learning environment.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  With state-of-the-art facilities and industry-expert faculty, we prepare students for successful careers in a rapidly evolving global landscape.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Meet Our Faculty
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
  <Image
    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXdwsQhacxRyXOAXzUOCPwJ5dhaqk_F9tkR1TfIM1dV6DO13qa6KGs39f2PZFzxGtj-UJy_wGSUh3jx3wAb5CAizDrx0TfkVz7oxOnRtbh-BmnNmJUeoFl5gVwcDaPeLLm1sRIpEZaeVBsJc2TNuEhhTo9m2vQC7-1PLuaHbSDqBZs5CSUeXYlQTvk9xAQFXUsjdleLBLoOU96hHmqDE7H8FPDVt1hRgEuZDfdSwuMZG7lI1Ihd3xSR1CK71xwIjF4xZqInO6VYk8"
    alt="Acme University Campus"
    fill
    className="object-cover"
  />
</div>

                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                      <FiAward className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Top Ranked</p>
                      <p className="text-sm text-gray-500">Nationwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <ProgramsSection />
        
        {/* Success Stories Section */}
        <SuccessStoriesSection />
        
        {/* Featured Projects Section */}
        <FeaturedProjectsSection />
        
        {/* Application Steps Section */}
        <ApplicationStepsSection />
        
        {/* Why Choose Us Section */}
        <WhyChooseUsSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Programs Section Component


const ProgramsSection = () => {
  const programs = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZyZI6rdCXJ8HvyV4rkaEbF53CtU3QYEOn-9-WegJ5_1PzmnG59ksBCfuYvyv-pQOJVpFC19JN8merJ3R9wrQsdMl73ZkvfpkmGs9ZdnHkwNWolOd6AX7lTIPs_qQO9PZnBzvC6vfXzgaVmKfi3I26w2ZaGiRxPDSqokySYu_jN4eVdN7FHNsOqzyMEU1QP8UvnEhae9sJiC411rVdmPVUS7uNXDmRN9KXJ43dIclFr_ZYbggvnW6493CKh1nXWx8c8T3KVwYv3u0",
      title: "Information Technology",
      description: "Explore the latest in tech and software development",
      duration: "4 Years",
      courses: "48 Courses"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM3PwRT4zbIY-22C_hpkc1-wlBP9yj-9mq-Y2ZmvpJ1gN21SCFH1CqD6LzKGMAypEIX4RVb-f4adv4JsWn9d3pLoaSbOtkLE_bZuRH5FjDqzzRJgdg7fD-eGv2wnxmaotuUDBRursCHLM4d2WR9A2M8fmKpza7rGRTpXsRbFeofyJ7URSLX4K0Om7Gr335ezCmH-mw-gjqBi054cQHMhAI6Z1Vj01WzVafM10QO6U4YYJXa7RhIBIRg3OEDtHts0av2XMmiRcjvV8",
      title: "Business Administration",
      description: "Lead with innovation and strategic thinking",
      duration: "4 Years",
      courses: "42 Courses"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW9fPXC7dt5LaKCxyDpHWv6CNJqk2PQ2gRowgZYbPXStNTJZmlnp5kP1xH5Q1Rmxxzgs1O_9KL09pgvgnnhAMaI1Q-Es_8VclvmFrNVZtzuoIfRbk6wNZBxy2X7n8gzT0NneCcHTmATyDz1t267Di5jf43uoiNjXyUyacoJBQ31SkBn6raVWc_f_GzF-CxNaKS_OHsSA_ZnzYHBgAteTYmk4ztz70uEG8oC2HR4LTwWqOU2h8me7P7sOxbG8SD01gSUpei277BlBI",
      title: "Creative Arts",
      description: "Express your creativity through various mediums",
      duration: "3 Years",
      courses: "36 Courses"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE70aJI3_4jJhTN92dhQ2F6rDkgLU9HcRuE6DtuWgKa8Vq_bAxczdPZpm7v4lER-CZzFBesTXMqViVq_UAaersRrDpasXuhbw78533DabcCuqMpZjbt7Eu5sWgiIgFyOaXqglvWP4-bAiknKONH_FVPDcdjnEg5fYg7VXT-zhrPHgLEGkKdD8lUNx-gqBIAwLBk1IA4tMeaRA_zELzJF7wkoBA04c5PcjmbgDlYbcZTmOGf9jKMk7WwV9lAb0_nZRI_Vou1Ie-ckk",
      title: "Health Sciences",
      description: "Care for the future with medical expertise",
      duration: "5 Years",
      courses: "52 Courses"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of undergraduate and graduate programs designed for your success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="relative overflow-hidden w-full h-48">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {program.duration}
                  </span>
                  <span>{program.courses}</span>
                </div>
                <button className="mt-auto w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                  Learn More
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
            View All Programs
          </button>
        </div>
      </div>
    </section>
  );
};




// Success Stories Section Component


import Image from 'next/image';

const SuccessStoriesSection = () => {
  const stories = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB57s2YsOkUz9IVAPk9rCW_5Q_ZslRYBeuRK8SM4-irKgEvrNGpUwAc2KTeM2KRx78JMaAIoKSz8IkVUIUJbkH4GJR229lxIdsi_hoVBWnUiY_6EKS15dtd8rnmDw9UqKIVEjjN2scSeYt34-J-gR6tp0FKfgLyuUfPL_gIppebBcOWLw55RNTHmblxOgYikrbAA9b5HxvOfVD3P2eHA11F4solLo7SxPCfP49iW_OR88AN9E3SlaJJ8UrMGqbrra0EWcnJJmVr9sA",
      title: "From Classroom to Boardroom",
      description: "Meet Sarah, a graduate who now leads a tech startup.",
      name: "Sarah Johnson",
      role: "CEO, Tech Innovations"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZZw6vL6vN7cARUN2s2B9IeUJFlx5vhGgQ_yUzXE1lmRsG36UWktnoVIp4_knK2DbqdjtfAggGm-9nLuiozfnHQyQJ21tuHFii_UrZXc2eg6c3Z6oGK_kC05_h-f9K-L9YZVk-9R8kGGPJuRFVItf3Fck2e9I5g6JO7OO2GQOFNKmY-e_xepCLefYgqXzz-FruRnBaiNAsT8D5aChQpadLxCe8AIdOW6cbFznZoA9X380eUg7F5ntjmS5tICKrh0NrCk2rWIirIwk",
      title: "Alumni Spotlight: Leading in Innovation",
      description: "Follow David's journey from student to industry leader.",
      name: "David Chen",
      role: "Product Director, Google"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtKit_LzXAwl9CGEDPBy90dLdbn0Zo0QnyOY0RQK7Fx2GI3IpTa99f7Cwqe6ccBAbJaX93l91dZ5j0c10aTmFUG38hA4N5YKiipBWW6JRrgx8R2O0spYN1iIQNN665-1H826F_fJWPQGOeY63IXlAhWW0xvwBsR0ziyZwhZ8WerZMhrKY7VP8FdIgqDRRivzRwO7_EBw6hB6p7sQY11yLCYo3OwbvZhmTFVDzDpDkXPL34WRi3UX0X76etrgsg2zWYqx16gu4hq3c",
      title: "Transforming Passion into Profession",
      description: "Discover how Emily turned her passion into a thriving career.",
      name: "Emily Davis",
      role: "Creative Director, Netflix"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our alumni who are making a difference in their industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#161b22] rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow min-h-[450px]"
            >
              <div>
                <div className="relative mb-6 w-full h-48">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{story.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{story.description}</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900 dark:text-white">{story.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{story.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




// Featured Projects Section Component
const FeaturedProjectsSection = () => {
  const projects = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsYvbGrpNnURV4yj9qDAA7Mx9TUPIAcVs9lUbTQqZfpDWNyOxQSItHN_fAbzrmCGpPHLvQBIFrvk64Wr35NY5RMJ66EASHN_h2D0GuRBfzajZyZrO1YpcEyXQ_9KZlaGTSVPcbRnJtF-5OjFLtvJYGG2APFqSremNKlRe85ZNqWLIqDDZvb7JRgXWfqOoCbiKD0TdUMx4JH11bzibUZWP9yiqAQ0Q0nI0eo8dUp1jkmF0MVezZA_kzz9GfKJBD5juceNMrripUWaE",
      title: "Innovative Tech Project",
      description: "A student-led project revolutionizing urban mobility with AI-powered solutions.",
      category: "Technology"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGZR9Dc3mOJzZZA4zDhJ0YWw390LjzPpKTVnzlpyU-Isf-sbDKDeWX9ugBVY-TXNk5v190dqovEv5KH1X2IBKYYsi7cHVQj8PpTxERvJLqQw6jtURvkEbO_jG4pCwH06FbbK89kOP6Wfr2NR5s2UbqRcuusBGymlhWXl1rZnb6nR5peMGtVXbGpiZsiDCpmCc_VdxzjGjWGwAJogM659WzxV1hQTR3G8WJ6V0P3X1NXg19p1krc6pza9-3hcuZQuL1bfEYDOaD13M",
      title: "Business Case Study",
      description: "A successful business strategy developed by our students for Fortune 500 companies.",
      category: "Business"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxcVvpi5SYfbgPuhwYVcBDODSGooS2WQS7l9TG3aRb3csoyry1D3rc-g9QUFoADAY3QFEwZDVI7YAtN90hrYDmlDe5DQTifgfMmhUVAYtVAGBAAbB9sF3rddQZTIUJswk_NROakrrumbeaQq05JgaozSeXcFCx2IMU5gsGxczvqxUPGxAJDztypQQvRx_KJrMARZgrXRO5EJzWO5mxG0BLVOlRcXU0Kn6TPNs-Vp--qb1ApiRMuB9O1tedcjC_gB8F5CgNX5EoIMw",
      title: "Creative Design Showcase",
      description: "A showcase of creative works from our arts program featured in international exhibitions.",
      category: "Arts"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJgKeDjUIpozZWAPeYulIsXKhNfgxnhiOCtxAWxjgugQfg31KcpBy7_v9_xKcCfSMoq3sWWnsbSvecyUyWWn6LINSgS6JHeqId2ozxmp9yPsMpUtV_1TZjDHDz5fcKn_Zh9gCxbd9lb2-aWdXGWaaNeg-ZuWvi8iZXgLvBetJurZ_PupnICgg8lvplnCz5mmz4APkAkxCb60F15wag0yT3LJbEJBnmgyO_Xv5IypBXlzYygO0oTXpkvniQIEHJ1SFHF2gf436UHJA",
      title: "Health Science Research",
      description: "Groundbreaking research in health sciences leading to new medical treatments.",
      category: "Science"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore innovative projects and research from our students and faculty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                  <Image
    src={project.image}          // your image URL
    alt={project.title}          // alt text
    fill                         // makes the image cover the container
    className="object-cover group-hover:scale-110 transition-transform duration-300"
    sizes="(max-width: 768px) 100vw, 33vw" // responsive sizes
  />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-2">
                  View Project
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Application Steps Section Component
const ApplicationStepsSection = () => {
  const steps = [
    {
      icon: <FiCheck className="w-6 h-6" />,
      title: "Check Eligibility",
      description: "Review requirements and ensure you qualify for your chosen program"
    },
    {
      icon: <FiBook className="w-6 h-6" />,
      title: "Submit Application",
      description: "Complete and submit your application with required documents"
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Track Status",
      description: "Monitor your application progress through our portal"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Apply in 3 Easy Steps</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your journey to Acme University with our simple application process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                {step.icon}
              </div>
              <div className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-blue-200" />
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors transform hover:-translate-y-1 shadow-lg">
            Start Your Application
          </button>
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section Component
const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Fast Admission",
      description: "Quick and efficient application process with 48-hour initial review"
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Affordable Education",
      description: "Competitive tuition fees and comprehensive financial aid options"
    },
    {
      icon: <FiBriefcase className="w-6 h-6" />,
      title: "Career Guidance",
      description: "Dedicated career services with 95% employment rate after graduation"
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Global Community",
      description: "Diverse student body from over 80 countries worldwide"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Acme University?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what makes us the preferred choice for students worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Your Future Starts Today
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of successful students who started their journey at Acme University. Take the first step toward your dream career.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:-translate-y-1 shadow-lg">
            Secure Your Admission Now
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
            Schedule Campus Tour
          </button>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const footerSections = [
    {
      title: "Academics",
      links: ["Undergraduate", "Graduate", "Online Programs", "Courses", "Faculty"]
    },
    {
      title: "Admissions",
      links: ["Apply Now", "Requirements", "Tuition & Fees", "Financial Aid", "Visit Campus"]
    },
    {
      title: "Campus Life",
      links: ["Student Life", "Housing", "Clubs", "Events", "Athletics"]
    },
    {
      title: "About",
      links: ["History", "Leadership", "Careers", "News", "Contact"]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AU</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Acme University</h3>
                <p className="text-gray-400 text-sm">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering students to achieve their dreams through quality education and innovative learning.
            </p>
            <div className="flex gap-4">
              {[FiPhone, FiMail, FiGlobe].map((Icon, index) => (
                <button key={index} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Acme University. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AcmeUniversity;