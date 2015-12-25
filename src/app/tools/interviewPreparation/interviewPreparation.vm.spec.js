/**
 * Created by yrganta on 6/29/15.
 */
'use strict';


describe('View Model: InterviewPrepViewModel', function () {
  var $injector, $httpBackend;

  beforeEach(function () {
    module('interviewPreparation.vm');

    inject(function (_$injector_) {
      $injector = _$injector_;

      $httpBackend = $injector.get('$httpBackend');

      var data;

      /* jshint ignore:start */
      data = {
        "total_items": 24,
        "page_size": 24,
        "page_count": 1,
        "_links": {
          "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions?api_module=optimal-interview\u0026api_service=questions\u0026api_service_operation=list-collection\u0026playlist_id=AFFr18\u0026status=active\u0026appId=40\u0026page=1"},
          "first": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions?api_module=optimal-interview\u0026api_service=questions\u0026api_service_operation=list-collection\u0026playlist_id=AFFr18\u0026status=active\u0026appId=40"},
          "last": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions?api_module=optimal-interview\u0026api_service=questions\u0026api_service_operation=list-collection\u0026playlist_id=AFFr18\u0026status=active\u0026appId=40\u0026page=1"}
        },
        "_embedded": {
          "questions": [{
            "id": "AFFFF7",
            "question_text": "Briefly tell me about yourself.",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFF7",
                "coaching_text": "The interviewer is asking this open-ended, icebreaker question looking for some introductory information from you and to see how you handle yourself.  Give a short and engaging response, ending on an interesting note so that the interviewer wants to hear more.  This age-old question is more about your personality and ability to provide a concise answer than the actual information you expose.  How you answer it will give the interviewer a look at how you approach things, how you prioritize and manage projects and activities and how you interact with co-workers.  And it\u0027s not just about whether you\u0027re captain material or content with being first officer.  It can actually be an opportunity for you to apply some gentle persuasion and boast a little about your skills and qualifications and where the interviewer has the chance to learn more about you and assess your personality and work demeanor.",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFA0A",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFA0A",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFA0A"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFF7"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFF7"}
                }
              }],
              "question_media": [{
                "id": "AFFA0r",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFA0r",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFA0r"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFF7"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFF7"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFF7"}
            }
          }, {
            "id": "AFFF9I",
            "question_text": "What do you know about our organization?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFF9I",
                "coaching_text": "Since you hopefully have researched the company, its competitors and the industry before starting the interview you should be well prepared for this question.  Focus on the company\u0027s recent accomplishments or press releases and mention any personal connection you may have with the organization.  Build rapport in the interview by showing interest in the company and interviewer.  Ask intelligent questions that show that you know something about the company, products or services. ",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAUx",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAUx",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAUx"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFF9I"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFF9I"}
                }
              }],
              "question_media": [{
                "id": "AFFAUz",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAUz",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAUz"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFF9I"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFF9I"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFF9I"}
            }
          }, {
            "id": "AFFFw7",
            "question_text": "Why do you think this is the right job for you?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFw7",
                "coaching_text": "This is your opportunity to launch into your elevator speech which should be focused on answering questions like this.  By asking a question like this, the interviewer is looking to be convinced that you want and know how to do the job and it\u0027s a good fit, not just that you know how to talk about it.  So craft a response that\u0027s both persuasive and detailed while at the same time keeping it big picture.  Be prepared in advance with a list of benefits the company would gain by hiring you.  Give an example of an instance where you were able to make a difference in a specific, definable way.  Your response should be confident and broadly laid out with a discussion as well touching on how you intend on being of benefit to the organization long term.",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFA2A",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFA2A",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFA2A"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFw7"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFw7"}
                }
              }],
              "question_media": [{
                "id": "AFFA2r",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFA2r",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFA2r"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFw7"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFw7"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFw7"}
            }
          }, {
            "id": "AFFFQW",
            "question_text": "Tell me the main reasons why would you want this job?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFQW",
                "coaching_text": "This is your opportunity to launch into your elevator speech which should be focused on answering questions like this.  By asking a question like this, the interviewer is looking to be convinced that you know how to do the job, not just that you know how to talk about it.  So craft a response that\u0027s both persuasive and detailed while at the same time keeping it big picture.  Be prepared in advance with a list of benefits the company would gain by hiring you.  Give an example of an instance where you were able to make a difference in a specific, definable way.  Your response should be confident and broadly laid out with a discussion as well touching on how you intend on being of benefit to the organization long term.",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAZJ",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAZJ",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAZJ"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFQW"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFQW"}
                }
              }],
              "question_media": [{
                "id": "AFFAZb",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAZb",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAZb"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFQW"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFQW"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFQW"}
            }
          }, {
            "id": "AFFFwp",
            "question_text": "Why should we hire you and not somebody else with similar qualifications?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFwp",
                "coaching_text": "Before your interview practice a short to-the-point response delineating what you bring to the table and what your unique selling points are. Tell them that you are the best person for the job and explain why. Response: \u0022My extensive experience in the industry shows I am well qualified and my impressive track record with past employers proves I am motivated yet easy to work with. Due to my experience as well as my strong work ethic and positive upbeat attitude I am the best person for the job.\u0022\r",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFA2q",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFA2q",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFA2q"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFwp"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFwp"}
                }
              }],
              "question_media": [{
                "id": "AFFA2Y",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFA2Y",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFA2Y"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFwp"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFwp"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFwp"}
            }
          }, {
            "id": "AFFFK1",
            "question_text": "What most interests you about working for this company?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFK1",
                "coaching_text": "The interviewer is looking to see what you know about their company which helps them to understand your specific level of interest in them.  Research on the company before the interview is critical to answering this question.  A specific answer is needed here and the person who has done their homework will give the better answer.  It\u0027s sometimes useful to add a question to the end of your response to move the discussion forward.  For example, you may want to ask if you fully answered their question, if they would like additional clarification or if they had any issues with your response.  Then you have an opportunity to put that requirement to rest before moving onto the next topic.",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAHo",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAHo",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAHo"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFK1"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFK1"}
                }
              }],
              "question_media": [{
                "id": "AFFAHH",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAHH",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAHH"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFK1"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFK1"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFK1"}
            }
          }, {
            "id": "AFFFFL",
            "question_text": "Can you give me an example of a school or work project that you are especially proud of?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFFL",
                "coaching_text": "Here\u0027s where interview preparation pays off.  Try to pick a project that has a strong connection to the skills you want to emphasize.   Whether it is school or work does not particularly matter but it should be one that you were heavily involved in from conception to completion.  If you can show hard evidence to support your answer to put the interviewer at ease, now might be a good time to do that.  If you have a portfolio with important documents and work samples you might want to offer to leave it behind.  ",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFA0m",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFA0m",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFA0m"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFFL"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFFL"}
                }
              }],
              "question_media": [{
                "id": "AFFA0K",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFA0K",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFA0K"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFFL"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFFL"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFFL"}
            }
          }, {
            "id": "AFFFr0",
            "question_text": "Do you have all the skills needed to perform in this position?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFr0",
                "coaching_text": "Most job descriptions contain specific skills required to perform the job successfully.  Interviewers will ask very exact questions about these skills in order to gauge how qualified you are and how proficient you are with each of them.  Very exact answers are expected in response.  Use examples to reinforce your response and be prepared to go into a fair amount of detail in follow up questions if asked.  Select examples that clearly demonstrate success with a particular skill.  Make your points quickly and try to avoid getting too bogged down in the details themselves.  You don\u0027t want to lose an interviewer\u0027s interest; you want to be elevating it.",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAqu",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAqu",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAqu"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFr0"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFr0"}
                }
              }],
              "question_media": [{
                "id": "AFFAq8",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAq8",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAq8"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFr0"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFr0"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFr0"}
            }
          }, {
            "id": "AFFF9x",
            "question_text": "What do you consider to be the most important skills for this job?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFF9x",
                "coaching_text": "Most job descriptions contain specific skills required to perform the job successfully.  Interviewers will ask very exact questions about these skills in order to gauge how qualified you are and how proficient you are with each of them.  Very exact answers are expected in response.  Use examples to reinforce your response and be prepared to go into a fair amount of detail in follow up questions if asked.  Select examples that clearly demonstrate success with a particular skill.  Make your points quickly and try to avoid getting too bogged down in the details themselves.  You don\u0027t want to lose an interviewer\u0027s interest; you want to be elevating it.",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAUO",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAUO",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAUO"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFF9x"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFF9x"}
                }
              }],
              "question_media": [{
                "id": "AFFAUW",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAUW",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAUW"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFF9x"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFF9x"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFF9x"}
            }
          }, {
            "id": "AFFFcm",
            "question_text": "What skill would you most like to improve in the short term?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFcm",
                "coaching_text": "This question is similar to asking what your greatest weakness is.  Avoid downgrading your abilities when asked a question like this, but instead reflect on any deficiency in a positive light.  Talk about how other strengths balance things out and your intention to strengthen any skill required to be successful at this position.  Talk about how you have worked to improve the area you are criticized in and consider discussing how criticism in this area has helped keep you motivated to improve yourself professionally.  Sometimes offering up references can be a good strategy for dispelling doubt about performance and attitudes about coworkers. You may want to quote what references have said about you in the past to support your candidacy. ",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAHB",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAHB",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAHB"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFcm"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFcm"}
                }
              }],
              "question_media": [{
                "id": "AFFAHy",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAHy",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAHy"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFcm"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFcm"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFcm"}
            }
          }, {
            "id": "AFFFum",
            "question_text": "How do you organize your work day to make realistic deadlines?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFum",
                "coaching_text": "Please be detailed and honest about your approach to time management. Be sure to mention any methods you may use (programs, apps, planners, to-do lists etc.).  You may also want to show how your time management methods may have evolved over time.  How you answer this question will give the interviewer a look at how you approach things, how you prioritize and manage projects and activities and how you interact with co-workers.  It can actually be an opportunity for you to apply some gentle persuasion and boast a little about your time management skills and qualifications and where the interviewer has the chance to learn more about you and assess your personality and work demeanor.  If you can show hard evidence to support your answer to put the interviewer at ease, now might be a good time to do that.  If you have a portfolio with important documents and work samples you might want to offer to leave it behind.  \r\r",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAYB",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAYB",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAYB"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFum"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFum"}
                }
              }],
              "question_media": [{
                "id": "AFFAYy",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAYy",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAYy"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFum"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFum"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFum"}
            }
          }, {
            "id": "AFFFr3",
            "question_text": "Give an example of an obstacle or major problem that you had to overcome in your career?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFr3",
                "coaching_text": "This situational or scenario type of question intends to uncover how you approach and overcome obstacles, and this presents an opportunity for you to demonstrate how your experience made the difference.  Give a constructive response showing how you resolved a problem or met a challenge.  You may want to go over an event or a change in direction in your career that you initially had trouble with but that turned into a positive developmental experience.  This might be a good time to refer to your resume or a portfolio item that would support your claim.",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAqs",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAqs",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAqs"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFr3"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFr3"}
                }
              }],
              "question_media": [{
                "id": "AFFAqG",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAqG",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAqG"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFr3"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFr3"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFr3"}
            }
          }, {
            "id": "AFFFFJ",
            "question_text": "Can you cite an example where you made a significant contribution to an employer?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFFJ",
                "coaching_text": "This question is very relevant because it is asking in effect what you can do for the company you are interviewing for.  Pick an example in which your employer called on you to complete a big project and you went above and beyond the call of duty to ensure that the job was done well.  Build rapport in the interview by showing interest in the company and interviewer.  Ask intelligent questions that show that you know something about the company, products or services. ",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFA0r",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFA0r",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFA0r"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFFJ"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFFJ"}
                }
              }],
              "question_media": [{
                "id": "AFFA0D",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFA0D",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFA0D"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFFJ"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFFJ"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFFJ"}
            }
          }, {
            "id": "AFFFvu",
            "question_text": "Nobody is perfect.  What would you consider your weakness?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFvu",
                "coaching_text": "Some interviewers like to put people on the spot with questions like these, but don\u0027t fall into the trap of conceding that you have weak areas that knock you out of contention.  Address areas of weakness as short term challenges that you intend to shore up should you get the job.  If you are entering the workforce your greatest weakness is probably your lack of experience.  Sometimes a weakness can actually lead to a strength such as working too hard or being obsessed with your work.   Be ready to show how this will not be a problem on the job that you seek balance and that your goal is to become strong in all areas.",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFALN",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFALN",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFALN"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFvu"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFvu"}
                }
              }],
              "question_media": [{
                "id": "AFFALC",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFALC",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFALC"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFvu"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFvu"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFvu"}
            }
          }, {
            "id": "AFFFcB",
            "question_text": "What would you consider to be your one greatest strength?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFcB",
                "coaching_text": "You should be well prepared to discuss how your strengths would be of benefit to the employer in any interview.  It\u0027s sometimes helpful to refer back to the resume when being asked very specific questions about your strengths or experience as proof.  Remember to also highlight your accomplishments whenever given the opportunity.  For example, if you were particularly strong in an important area mention that and provide an example to drive the point home.  Your goal is to make yourself the top candidate by taking stock of your skills and relating them to the job requirements and communicating them in the interview.  Talking about your skills with self promotion in an interview situation is expected.",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAOG",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAOG",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAOG"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFcB"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFcB"}
                }
              }],
              "question_media": [{
                "id": "AFFAO1",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAO1",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAO1"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFcB"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFcB"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFcB"}
            }
          }, {
            "id": "AFFFcZ",
            "question_text": "What three adjectives best illustrate who you are?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFcZ",
                "coaching_text": "The interviewer is looking for a quick response here. Keep your answer upbeat with a positive spin even if giving a negative adjective. Think glass half-full instead of glass half-empty. For example \u0022detail-oriented\u0022 rather than \u0022nit-picker\u0022 or \u0022assertive\u0022 rather than \u0022aggressive.\u0022 Response: \u0022Upbeat; passionate; well rounded.\u0022",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAOc",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAOc",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAOc"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFcZ"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFcZ"}
                }
              }],
              "question_media": [{
                "id": "AFFAOS",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAOS",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAOS"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFcZ"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFcZ"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFcZ"}
            }
          }, {
            "id": "AFFFKr",
            "question_text": "What is the one thing about yourself that has not come up in the interview that you want our company to know about?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFKr",
                "coaching_text": "Consider this an opportunity to present something positive that may not have come up before. Response: \u0022Although this has come up I would like to emphasize that I am the type of person that gets along with everybody and helps people get along. This has been extremely helpful in working on teams with strong personalities.\u0022 Sometimes offering up references can be a good strategy for dispelling doubt about performance and attitudes. You may want to quote what references have said about you in the past to support your candidacy.",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAoT",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAoT",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAoT"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFKr"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFKr"}
                }
              }],
              "question_media": [{
                "id": "AFFAoM",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAoM",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAoM"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFKr"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFKr"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFKr"}
            }
          }, {
            "id": "AFFFFY",
            "question_text": "Can you give an example of your problem-solving ability?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFFY",
                "coaching_text": "This is a straight-forward question investigating your problem-solving skills.  Give a colorful and specific example of where you used creative thinking and problem solving to find an innovative way to work out an issue. If you have a portfolio, now would be a great time to offer that up as proof.  Some gentle persuasion is expected and needed in an interview and this may be your opportunity to boast a little about your skills and qualifications. ",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFA0Q",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFA0Q",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFA0Q"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFFY"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFFY"}
                }
              }],
              "question_media": [{
                "id": "AFFA09",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFA09",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFA09"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFFY"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFFY"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFFY"}
            }
          }, {
            "id": "AFFFuu",
            "question_text": "How do you make decisions?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFuu",
                "coaching_text": "Remember that there are many different styles of making decisions not just a single correct one.  Lay out your personal decision making style and emphasize that you are rational and do not decide too compulsively.  If you can show hard evidence to support your answer to put the interviewer at ease, now might be a good time to do that.  If you have a portfolio with important documents and work samples you might want to offer to leave it behind.  Build rapport in the interview by showing interest in the company and interviewer.  Ask intelligent questions that show that you know something about the company, products or services. ",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAYN",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAYN",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAYN"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFuu"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFuu"}
                }
              }],
              "question_media": [{
                "id": "AFFAYC",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAYC",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAYC"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFuu"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFuu"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFuu"}
            }
          }, {
            "id": "AFFFry",
            "question_text": "Give an example of when you used diplomacy to get your way.",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFry",
                "coaching_text": "Let your negotiation skills shine through here. How you answer it will give the interviewer a look at how you approach things, how you prioritize and manage projects and activities and how you interact with co-workers.  This can actually be an opportunity for you to apply some gentle persuasion and boast a little about your skills and qualifications and where the interviewer has the chance to learn more about you and assess your personality and work demeanor.  If you can, try to give proof of any claims you make, and you will build your credibility.  Be prepared in advance with any documentation that would support your claims. ",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAq1",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAq1",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAq1"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFry"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFry"}
                }
              }],
              "question_media": [{
                "id": "AFFAq5",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAq5",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAq5"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFry"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFry"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFry"}
            }
          }, {
            "id": "AFFFA5",
            "question_text": "Describe one of your failures and how you handled it.",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFA5",
                "coaching_text": "When asked a question about failures in your career, understand that failure builds character and we learn from our failures.  Avoid sugarcoating your failures but know in advance which ones to talk about and which to avoid.  Talk about the failures you learned from. The interviewer does not want to hear the story of some spectacular failure.  Rather describe a minor failure but then turn the question into a positive by showing how you recovered from the failure and learned from the experience. Avoid downgrading your abilities when asked if you don\u0027t meet some requirement, but instead try to reflect on the deficiency in a positive light. ",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAkH",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAkH",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAkH"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFA5"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFA5"}
                }
              }],
              "question_media": [{
                "id": "AFFAkO",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAkO",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAkO"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFA5"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFA5"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFA5"}
            }
          }, {
            "id": "AFFFFZ",
            "question_text": "Can you give me an example of when you went above and beyond the call of duty?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFFZ",
                "coaching_text": "Part of building rapport with an interviewer involves being polite and positive.  For example, if the interviewer asks a good question, begin your response with, \u0027That\u0027s a great question\u0027 and the tone of the response will be well received.  Your greatest accomplishments and measurable achievements are important.  Ideally this example should be something specific and translates to a quality needed to succeed in this position.  Use your communication skills and body language to help emphasize your success example. ",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFA0c",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFA0c",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFA0c"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFFZ"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFFZ"}
                }
              }],
              "question_media": [{
                "id": "AFFA0S",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFA0S",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFA0S"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFFZ"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFFZ"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFFZ"}
            }
          }, {
            "id": "AFFFrm",
            "question_text": "Did you ever have to confront someone to get something done?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFrm",
                "coaching_text": "This conflict-based question often trips people up because they take sides or respond emotionally.  Stay objective and show how you rose above the conflict and managed to diffuse it.  Confronting someone in a positive yet influential way shows interpersonal and leadership skills.  Tell about a time you had to compel employees or fellow team members to carry their share of the weight.  It\u0027s sometimes useful to add a question to the end of your response to move the discussion forward. For example, you may want to ask if you fully answered their question, if they would like additional clarification or if they had any issues with your response. Then you have an opportunity to put that requirement to rest before moving onto the next topic.",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFAkB",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAkB",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAkB"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFrm"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFrm"}
                }
              }],
              "question_media": [{
                "id": "AFFAky",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAky",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAky"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFrm"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFrm"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFrm"}
            }
          }, {
            "id": "AFFFwH",
            "question_text": "Why have you left your prior positions?",
            "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
            "status": "active",
            "create_date": "2014-03-04T20:09:23-0500",
            "_embedded": {
              "coaching": [{
                "id": "AFFFwH",
                "coaching_text": "The interviewer wants to understand the circumstances under which you left your past job. Be honest. If circumstances were less than ideal avoid getting into a great level of detail. Your prior job simply may not have been a good fit for you. Response: \u0022I left my last position because it was not a good match for my long-term career path and it was time for me to move on. I had an excellent relationship with my manager and left under good terms.\u0022\r",
                "_embedded": {
                  "coaching_media": [{
                    "id": "AFFA2V",
                    "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFA2V",
                    "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFA2V"}}
                  }]
                },
                "_links": {
                  "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFwH"},
                  "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFwH"}
                }
              }],
              "question_media": [{
                "id": "AFFA27",
                "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFA27",
                "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFA27"}}
              }]
            },
            "_links": {
              "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFwH"},
              "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFwH"},
              "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFwH"}
            }
          }]
        }
      };
      /* jshint ignore:end */

      $httpBackend.expectGET(/\/api\/interview\/optimal-interview\/questions\?api_module=optimal-interview&api_service=questions&api_service_operation=list-collection&playlist_id=AFFr18&status=active/).respond(angular.toJson(data));

    });
  });

  afterEach(function () {
    $injector = $httpBackend = undefined;
  });


  it('Tests validate Model is an object with faqs, searchQuestions properties and getQuestions, ready methods' +
    ' defined.', function () {
    var iPrepModel;

    expect(iPrepModel).toBeUndefined();

    iPrepModel = $injector.get('InterviewPrepViewModel');

    expect(iPrepModel).toBeDefined();
    expect(angular.isObject(iPrepModel)).toEqual(true);

    expect(iPrepModel.faqs).toBeDefined();
    expect(angular.isArray(iPrepModel.faqs)).toEqual(true);


    expect(iPrepModel.searchQuestions).toBeDefined();
    expect(angular.isArray(iPrepModel.searchQuestions)).toEqual(true);

    expect(iPrepModel.getQuestions).toBeDefined();
    expect(angular.isFunction(iPrepModel.getQuestions)).toEqual(true);

    expect(iPrepModel.init).toBeDefined();
    var initResp = iPrepModel.init();
    expect(angular.isObject(initResp)).toEqual(true);
    expect(angular.isFunction(initResp.then)).toEqual(true);


    // The first time getQuestions is called faqs and searchQuestions should be same.
    expect(iPrepModel.faqs.length).toEqual(0);
    expect(iPrepModel.searchQuestions.length).toEqual(0);

    $httpBackend.flush();

    expect(iPrepModel.faqs.length).toEqual(24);
    expect(iPrepModel.searchQuestions.length).toEqual(24);

  });


  it('Expect getQuestions to pass the parameters passed in to OptimalService and flatten the results that a back' +
    ' from', function () {
    var data, oInterview, iPrepModel, responsePromise;

    /* jshint ignore:start */
    data = {
      "total_items": 2,
      "page_size": 2,
      "page_count": 1,
      "_links": {
        "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions?page=1\u0026question_text=greatest%20strength\u0026appId=40"},
        "first": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions?question_text=greatest%20strength\u0026appId=40"},
        "last": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions?page=1\u0026question_text=greatest%20strength\u0026appId=40"}
      },
      "_embedded": {
        "questions": [{
          "id": "AFFD4n",
          "question_text": "Robotics spans many engineering disciplines. In which engineering areas would you say your greatest strengths are?",
          "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
          "status": "active",
          "create_date": "2014-09-07T15:23:45-0400",
          "_embedded": {
            "coaching": [{
              "id": "AFFD4n",
              "coaching_text": "Understanding where your engineering strengths are is an expected question and one that you should have considered in advance.  In their eyes, it\u0027s a major selling point if you have expertise and tested knowledge in robotics engineering and the capacity to build and expand that expertise in the future.  Your response should be an enthusiastic overview of what you\u0027re bringing to the table and consequently the benefits of hiring you.  Craft it so that it\u0027s clear that what you\u0027d be expected to do, you could do well.",
              "_embedded": {
                "coaching_media": [{
                  "id": "AFFDV8",
                  "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFDV8",
                  "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFDV8"}}
                }]
              },
              "_links": {
                "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFD4n"},
                "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFD4n"}
              }
            }],
            "question_media": [{
              "id": "AFFD0Z",
              "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFD0Z",
              "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFD0Z"}}
            }]
          },
          "_links": {
            "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFD4n"},
            "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFD4n"},
            "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFD4n"}
          }
        }, {
          "id": "AFFFcB",
          "question_text": "What would you consider to be your one greatest strength?",
          "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
          "status": "active",
          "create_date": "2014-03-04T20:09:23-0500",
          "_embedded": {
            "coaching": [{
              "id": "AFFFcB",
              "coaching_text": "You should be well prepared to discuss how your strengths would be of benefit to the employer in any interview.  It\u0027s sometimes helpful to refer back to the resume when being asked very specific questions about your strengths or experience as proof.  Remember to also highlight your accomplishments whenever given the opportunity.  For example, if you were particularly strong in an important area mention that and provide an example to drive the point home.  Your goal is to make yourself the top candidate by taking stock of your skills and relating them to the job requirements and communicating them in the interview.  Talking about your skills with self promotion in an interview situation is expected.",
              "_embedded": {
                "coaching_media": [{
                  "id": "AFFAOG",
                  "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAOG",
                  "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAOG"}}
                }]
              },
              "_links": {
                "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFcB"},
                "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFcB"}
              }
            }],
            "question_media": [{
              "id": "AFFAO1",
              "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAO1",
              "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAO1"}}
            }]
          },
          "_links": {
            "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFcB"},
            "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFcB"},
            "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFcB"}
          }
        }]
      }
    };
    /* jshint ignore:end */

    oInterview = $injector.get('OptimalInterview');

    iPrepModel = $injector.get('InterviewPrepViewModel');
    iPrepModel.init();

    // set up request for search query 'greatest strength'

    // Flush out initial request to retrieve the faqs.
    $httpBackend.flush();

    expect(iPrepModel.faqs.length).toBe(24);
    expect(iPrepModel.searchQuestions.length).toBe(24);


    // spy on oInterview.getQuestions to test for params passed in.
    spyOn(oInterview, 'getQuestions').and.callThrough();
    $httpBackend.expectGET(/\/api\/interview\/optimal-interview\/questions\?page=1&question_text=greatest\+strength/).respond(angular.toJson(data));

    // Simulate the search request.
    responsePromise = iPrepModel.getQuestions({
      'question_text': 'greatest strength'
      , 'page': 1
    });

    // A promise must be returned from the service call.
    expect(angular.isObject(responsePromise)).toEqual(true);
    expect(angular.isFunction(responsePromise.then)).toEqual(true);

    // Test for the params being passed to optimal service.
    expect(oInterview.getQuestions.calls.argsFor(0)[0].question_text).toEqual('greatest strength'); // jshint ignore:line
    expect(oInterview.getQuestions.calls.argsFor(0)[0].page).toEqual(1);

    // Flush the response out and test for see if the questions are rightly assigned to searchQuestions property of
    // model and are flattened.
    $httpBackend.flush();

    expect(iPrepModel.searchQuestions.length).toBe(2);
    expect(iPrepModel.searchQuestions[0].questionsText).toEqual('Robotics spans many engineering disciplines. In which engineering areas would you say your greatest strengths are?');
    expect(iPrepModel.searchQuestions[0].questionVideo).toEqual('https://api.optimalresume.com/optimal-interview/media/question/AFFD0Z');

  });

});

describe('Service: optimalInterviewService', function () {
  var $httpBackend, $injector;


  beforeEach(function () {
    module('optimalInterviewService');

    inject(function (_$injector_) {
      $injector = _$injector_;

      $httpBackend = $injector.get('$httpBackend');
    });

  });

  afterEach(function () {
    $injector = $httpBackend = undefined;
  });

  it('Initialization of service should provide us with an object with a single method to query Optimal resume', function () {
    var oInterview;

    expect(oInterview).toBeUndefined();

    oInterview = $injector.get('OptimalInterview');

    expect(oInterview).toBeDefined();
    expect(angular.isObject(oInterview)).toEqual(true);
    expect(oInterview.getQuestions).toBeDefined();
    expect(angular.isFunction(oInterview.getQuestions)).toEqual(true);

  });


  it('Querying Optimal resume service should return transformed response back', function () {
    var oInterview, requestPromise, response, data;

    oInterview = $injector.get('OptimalInterview');

    /* jshint ignore:start */
    data = {
      "total_items": 2,
      "page_size": 2,
      "page_count": 1,
      "_links": {
        "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions?page=1\u0026question_text=greatest%20strength\u0026appId=40"},
        "first": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions?question_text=greatest%20strength\u0026appId=40"},
        "last": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions?page=1\u0026question_text=greatest%20strength\u0026appId=40"}
      },
      "_embedded": {
        "questions": [{
          "id": "AFFD4n",
          "question_text": "Robotics spans many engineering disciplines. In which engineering areas would you say your greatest strengths are?",
          "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
          "status": "active",
          "create_date": "2014-09-07T15:23:45-0400",
          "_embedded": {
            "coaching": [{
              "id": "AFFD4n",
              "coaching_text": "Understanding where your engineering strengths are is an expected question and one that you should have considered in advance.  In their eyes, it\u0027s a major selling point if you have expertise and tested knowledge in robotics engineering and the capacity to build and expand that expertise in the future.  Your response should be an enthusiastic overview of what you\u0027re bringing to the table and consequently the benefits of hiring you.  Craft it so that it\u0027s clear that what you\u0027d be expected to do, you could do well.",
              "_embedded": {
                "coaching_media": [{
                  "id": "AFFDV8",
                  "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFDV8",
                  "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFDV8"}}
                }]
              },
              "_links": {
                "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFD4n"},
                "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFD4n"}
              }
            }],
            "question_media": [{
              "id": "AFFD0Z",
              "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFD0Z",
              "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFD0Z"}}
            }]
          },
          "_links": {
            "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFD4n"},
            "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFD4n"},
            "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFD4n"}
          }
        }, {
          "id": "AFFFcB",
          "question_text": "What would you consider to be your one greatest strength?",
          "question_source": {"id": "AFFFFA", "name": "OptimalResume App"},
          "status": "active",
          "create_date": "2014-03-04T20:09:23-0500",
          "_embedded": {
            "coaching": [{
              "id": "AFFFcB",
              "coaching_text": "You should be well prepared to discuss how your strengths would be of benefit to the employer in any interview.  It\u0027s sometimes helpful to refer back to the resume when being asked very specific questions about your strengths or experience as proof.  Remember to also highlight your accomplishments whenever given the opportunity.  For example, if you were particularly strong in an important area mention that and provide an example to drive the point home.  Your goal is to make yourself the top candidate by taking stock of your skills and relating them to the job requirements and communicating them in the interview.  Talking about your skills with self promotion in an interview situation is expected.",
              "_embedded": {
                "coaching_media": [{
                  "id": "AFFAOG",
                  "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/coaching\/AFFAOG",
                  "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media\/AFFAOG"}}
                }]
              },
              "_links": {
                "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching\/AFFFcB"},
                "coaching-media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching-media?coaching_id=AFFFcB"}
              }
            }],
            "question_media": [{
              "id": "AFFAO1",
              "media_url": "https:\/\/api.optimalresume.com\/optimal-interview\/media\/question\/AFFAO1",
              "_links": {"self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media\/AFFAO1"}}
            }]
          },
          "_links": {
            "self": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions\/AFFFcB"},
            "coaching": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/coaching?question_id=AFFFcB"},
            "question_media": {"href": "https:\/\/api.optimalresume.com\/optimal-interview\/questions-media?question_id=AFFFcB"}
          }
        }]
      }
    };
    /* jshint ignore:end */

    $httpBackend.expectGET(/\/api\/interview\/optimal-interview\/questions\?page=1&question_text=greatest\+strength/).respond(angular.toJson(data));

    expect(oInterview).toBeDefined();
    expect(requestPromise).toBeUndefined();

    requestPromise = oInterview.getQuestions({
      'question_text': 'greatest strength'
      , 'page': 1
    });


    expect(requestPromise).toBeDefined();
    expect(angular.isFunction(requestPromise.then)).toEqual(true);


    requestPromise.then(function (resp) {
      response = resp.data;
    });


    $httpBackend.flush();

    expect( angular.isArray(response) ).toEqual(true);
    expect( response[0]._embedded.coaching[0].coaching_text).toBeDefined(); // jshint ignore:line
    expect( response[0].question_text).toBeDefined(); // jshint ignore:line
    expect( response[0]._embedded.question_media[0].media_url).toBeDefined(); // jshint ignore:line
  });

});
