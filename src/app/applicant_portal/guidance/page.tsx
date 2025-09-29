// app/registration-guide/page.tsx
'use client'

import { useState } from 'react'
import { 
  UserIcon, 
  AcademicCapIcon, 
  BookOpenIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SparklesIcon,
  DocumentCheckIcon,
  ClipboardDocumentListIcon,
  PhotoIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function RegistrationGuide() {
  const [expandedStep, setExpandedStep] = useState<number | null>(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (step: number) => {
    setExpandedStep(expandedStep === step ? null : step)
  }

  const toggleStepCompletion = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    )
  }

  const registrationSteps = [
    {
      id: 1,
      icon: UserIcon,
      title: "Personal Information",
      description: "Tell us about yourself - this helps us get to know you better",
      estimatedTime: "5-8 minutes",
      instructions: [
        {
          icon: UserIcon,
          title: "Full Legal Name",
          details: "Enter your name exactly as it appears on your official ID documents"
        },
        {
          icon: PhotoIcon,
          title: "Profile Photo",
          details: "Upload a recent, clear photo for your student profile"
        },
        {
          icon: ClipboardDocumentListIcon,
          title: "Contact Details",
          details: "Provide your current address, phone number, and primary email"
        },
        {
          icon: DocumentCheckIcon,
          title: "Identification",
          details: "Have your government ID or passport ready for verification"
        }
      ],
      tips: [
        "Double-check spelling - it must match your official documents",
        "Use a permanent email you check regularly",
        "Include country code for international phone numbers"
      ],
      commonMistakes: [
        "Nicknames instead of legal names",
        "Outdated contact information",
        "Missing country codes"
      ]
    },
    {
      id: 2,
      icon: AcademicCapIcon,
      title: "Academic Background",
      description: "Share your educational journey and achievements",
      estimatedTime: "10-15 minutes",
      instructions: [
        {
          icon: DocumentCheckIcon,
          title: "Education History",
          details: "List all high schools, colleges, and universities you've attended"
        },
        {
          icon: BookOpenIcon,
          title: "Grades & Transcripts",
          details: "Enter your GPA and have unofficial transcripts ready to upload"
        },
        {
          icon: SparklesIcon,
          title: "Test Scores",
          details: "Include SAT, ACT, TOEFL, IELTS, or other required test scores"
        },
        {
          icon: AcademicCapIcon,
          title: "Achievements",
          details: "Highlight awards, honors, scholarships, and special recognitions"
        }
      ],
      tips: [
        "Convert international grades to 4.0 scale if needed",
        "Have digital copies of transcripts ready before starting",
        "Include all institutions, even if you transferred"
      ],
      commonMistakes: [
        "Incomplete education history",
        "Wrong GPA calculation",
        "Missing test score reports"
      ]
    },
    {
      id: 3,
      icon: BookOpenIcon,
      title: "Choose Your Program",
      description: "Select the academic path that matches your goals",
      estimatedTime: "8-12 minutes",
      instructions: [
        {
          icon: AcademicCapIcon,
          title: "Degree Level",
          details: "Choose between Undergraduate, Graduate, or Professional programs"
        },
        {
          icon: MagnifyingGlassIcon,
          title: "Browse Programs",
          details: "Explore available majors and find your perfect fit"
        },
        {
          icon: SparklesIcon,
          title: "Specializations",
          details: "Select concentrations, minors, or special tracks if available"
        },
        {
          icon: ClockIcon,
          title: "Start Date",
          details: "Pick your preferred intake: Fall, Spring, or Summer semester"
        }
      ],
      tips: [
        "Research program requirements before selecting",
        "Consider your career goals when choosing a major",
        "Check application deadlines for your chosen program"
      ],
      commonMistakes: [
        "Choosing wrong degree level",
        "Not researching program prerequisites",
        "Missing program-specific deadlines"
      ]
    },
    {
      id: 4,
      icon: DocumentTextIcon,
      title: "Upload Documents",
      description: "Submit your supporting materials for review",
      estimatedTime: "12-18 minutes",
      instructions: [
        {
          icon: DocumentCheckIcon,
          title: "Required Documents",
          details: "Official transcripts, test scores, ID, and program-specific materials"
        },
        {
          icon: PhotoIcon,
          title: "Supplemental Files",
          details: "Resume, portfolio, writing samples, or additional requirements"
        },
        {
          icon: ClipboardDocumentListIcon,
          title: "File Guidelines",
          details: "PDF format preferred, clear scans, under 10MB per file"
        },
        {
          icon: MagnifyingGlassIcon,
          title: "Quality Check",
          details: "Ensure all documents are readable, complete, and properly named"
        }
      ],
      tips: [
        "Scan documents in high resolution (300 DPI)",
        "Name files clearly: 'Transcript_YourName_Date.pdf'",
        "Double-check that multi-page documents are complete"
      ],
      commonMistakes: [
        "Blurry or unreadable scans",
        "Wrong file formats",
        "Missing pages from multi-page documents"
      ]
    },
    {
      id: 5,
      icon: CheckCircleIcon,
      title: "Review & Submit",
      description: "Final check before completing your application",
      estimatedTime: "5-10 minutes",
      instructions: [
        {
          icon: MagnifyingGlassIcon,
          title: "Comprehensive Review",
          details: "Carefully check every section for accuracy and completeness"
        },
        {
          icon: DocumentCheckIcon,
          title: "Application Fee",
          details: "Pay the processing fee using our secure payment system"
        },
        {
          icon: CheckCircleIcon,
          title: "Final Submission",
          details: "Submit your completed application - no changes allowed after"
        },
        {
          icon: InformationCircleIcon,
          title: "Confirmation",
          details: "Save your application ID and wait for confirmation email"
        }
      ],
      tips: [
        "Review each section twice before final submission",
        "Save or print a copy of your submitted application",
        "Note your application ID for all future communications"
      ],
      commonMistakes: [
        "Rushing through final review",
        "Not saving confirmation details",
        "Missing application fee payment"
      ]
    }
  ]

  const completionPercentage = Math.round((completedSteps.length / registrationSteps.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/10">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-4 sm:mb-6 shadow-lg">
            <BookOpenIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Complete Your Registration
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
            Follow these simple steps to complete your university application. 
            We ll guide you through each part of the process.
          </p>
        </div>

        {/* Progress Overview Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Your Application Progress
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">
                {completedSteps.length} of {registrationSteps.length} steps completed
              </p>
            </div>
            <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 sm:px-4 py-1 sm:py-2 rounded-full">
              {completionPercentage}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 sm:h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 sm:h-4 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span>Just starting</span>
            <span>Almost there!</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Registration Steps */}
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          {registrationSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id)
            const isExpanded = expandedStep === index
            
            return (
              <div
                key={step.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                  isCompleted 
                    ? 'border-green-200 dark:border-green-800' 
                    : 'border-gray-200 dark:border-gray-700'
                } ${
                  isExpanded ? 'ring-2 ring-blue-500/20' : ''
                }`}
              >
                {/* Step Header */}
                <button
                  onClick={() => toggleStep(index)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    {/* Step Number & Status */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                          : 'bg-gradient-to-br from-blue-500 to-purple-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          step.id
                        )}
                      </div>
                      
                      {/* Step Icon and Title */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                          isCompleted 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        }`}>
                          <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-0.5">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Time and Expand Icon */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Time Estimate */}
                    <div className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                      <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        {step.estimatedTime}
                      </span>
                    </div>

                    {/* Expand/Collapse Icon */}
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUpIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                      {/* Instructions Column */}
                      <div className="space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-2">
                          <ClipboardDocumentListIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            What You will Need
                          </h4>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                          {step.instructions.map((instruction, idx) => (
                            <div key={idx} className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                              <div className="flex-shrink-0 w-8 h-8 bg-white dark:bg-blue-800 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <instruction.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                                  {instruction.title}
                                </h5>
                                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                                  {instruction.details}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips & Warnings Column */}
                      <div className="space-y-4 sm:space-y-6">
                        {/* Helpful Tips */}
                        <div>
                          <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <SparklesIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Pro Tips
                            </h4>
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            {step.tips.map((tip, idx) => (
                              <div key={idx} className="flex gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                                <SparklesIcon className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-green-800 dark:text-green-300 text-xs sm:text-sm">
                                  {tip}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Common Mistakes */}
                        <div>
                          <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Avoid These Mistakes
                            </h4>
                          </div>
                          <div className="space-y-2 sm:space-y-3">
                            {step.commonMistakes.map((mistake, idx) => (
                              <div key={idx} className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800">
                                <ExclamationTriangleIcon className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                <p className="text-amber-800 dark:text-amber-300 text-xs sm:text-sm">
                                  {mistake}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Section */}
                    <div className="mt-6 sm:mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <ClockIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          <div>
                            <p className="text-slate-800 dark:text-slate-300 text-sm font-medium">
                              Estimated time: <span className="font-bold">{step.estimatedTime}</span>
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-xs">
                              Have your documents ready to save time
                            </p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => toggleStepCompletion(step.id)}
                          className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                            isCompleted
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircleIcon className="w-4 h-4" />
                              Completed
                            </>
                          ) : (
                            <>
                              <CheckCircleIcon className="w-4 h-4" />
                              Mark as Complete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Completion Celebration */}
        {completionPercentage === 100 && (
          <div className="mt-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 sm:p-8 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              🎉 All Steps Completed!
            </h2>
            <p className="text-green-100 text-lg mb-4 max-w-2xl mx-auto">
              Amazing! You have completed all the preparation steps. You are now ready to start your actual application.
            </p>
          </div>
        )}

        {/* Support Section */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <InformationCircleIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Need Help Along the Way?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4">
              Our admissions team is here to help you with any questions
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="mailto:admissions@university.edu"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
              >
                📧 Email Support
              </a>
              <a 
                href="tel:+1234567890"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200 text-sm"
              >
                📞 Call Admissions
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}