/**
 * Created by yrganta on 6/29/15.
 */

'use strict';

describe('Controller: InterviewPreparation', function () {
  var $injector, iPrepModel, $httpBackend, $controller, $rootScope;

  beforeEach(function () {
    module('interviewPreparation.vm');
    module('interviewPreparation');
    module('partitionFilter');
    module('ui.router');
    module('LocalStorageModule');

    inject(function (_$injector_) {
      $injector = _$injector_;

      iPrepModel = $injector.get('InterviewPrepViewModel');

      $httpBackend = $injector.get('$httpBackend');

      $controller = $injector.get('$controller');

      $rootScope = $injector.get('$rootScope');

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

      //stub model with faqs with static response.
      $httpBackend.expectGET(/\/api\/interview\/optimal-interview\/questions\?api_module=optimal-interview&api_service=questions&api_service_operation=list-collection&playlist_id=AFFr18&status=active/).respond(angular.toJson(data));

    });
  });


  afterEach(function () {
    $injector = iPrepModel = $httpBackend = $controller = $rootScope = undefined;
  });


  it('Initialization of controller', function () {
    var iPrepCtrl, scope;
    scope = $rootScope.$new();
    iPrepCtrl = $controller('InterviewPrepController', {$scope: scope});

    expect(iPrepCtrl.goToSearch).toBeDefined();
    expect(iPrepCtrl.curIndex).toBeDefined();
    expect(iPrepCtrl.selectQuestion).toBeDefined();
    expect(iPrepCtrl.onSlideChanged).toBeDefined();
    expect(iPrepCtrl.init).toBeDefined();
    expect(iPrepCtrl.questions).toBeDefined();

    expect(scope.inTimelineView).toBeDefined();
    expect(scope.activeClass).toBeDefined();
  });


  it('iPrepCtrl.questions', function () {
    var iPrepCtrl;

    iPrepCtrl = $controller('InterviewPrepController', {$scope: $rootScope.$new()});
    iPrepCtrl.init();

    $httpBackend.flush();

    expect(iPrepCtrl.questions).toBeDefined();
    expect(angular.isArray(iPrepCtrl.questions)).toBe(true);
    expect(iPrepCtrl.questions.length).toBe(24);


    iPrepModel.searchQuestions = [{
      'questionsText': 'Communication skills and problem solving' +
      ' skills are important to this position. Give examples that would show to me that you possess these skills.',
      'status': 'active',
      'coachsTip': 'The interviewer is looking for the specifics of your demonstrated, repeatable communications skills.  You may think it\'s a simple enough question but unless you portray confidence and validate that you have these skills, you may not be going far enough with your answer.  Be sure to pay attention to describing how you acquired and practiced the skills, over what time frame, how easy or hard they were to master and whether this is something that you enjoy doing.  The example used in your response should be detailed and fully explained, yet brief enough to keep the interviewer\'s interest.  Too much information can be as bad as not enough.',
      'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFDMW',
      'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFDtI'
    }, {
      'questionsText': 'Complex problem solving with a strong attention to detail are important to this biological technician position. How would you demonstrate that you possess those skills?',
      'status': 'active',
      'coachsTip': 'Merely laundry listing your skills or saying \'yes, I can do that\' doesn\'t explain how well you can do them and how well you\'d fit into the biological technician position you\'re pursuing.  Pinpoint the specifics of the skills while at the same time your strengths with each and how you came to learn and use them.  Choose an example from past experience that highlights your problem solving abilities as well as your attention to detail.  This should be a brief overview type of answer.  Too many details, unless asked for, can bog you down and sidetrack the conversation so take care to give the interviewer highlights as opposed to going over every little thing.',
      'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFDyI',
      'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFuAZ'
    }, {
      'questionsText': 'Do you have any examples that would show me your use of deductive reasoning and complex problem solving?',
      'status': 'active',
      'coachsTip': 'The interviewer is looking broadly at how talented and capable you are to perform in the chemist' +
      ' position you\'re interviewing for.  They\'re also looking at the strength of that talent foundation and the potential to build on it in the future.  You should give examples and be able to point to specific deductive reasoning accomplishments in your response but how you answer is as important as what you answer, especially with this particular line of questioning.  Showing positive body language and having an upbeat, energetic tone of voice can go a long way.',
      'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFuAx',
      'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFuvc'
    }, {
      'questionsText': 'Give an example that would help me to understand your skills for complex problem solving. Tell me about your critical thinking skills.',
      'status': 'active',
      'coachsTip': 'Merely laundry listing your skills or saying \'yes, I can do that\' doesn\'t explain how well you can do them and how well you\'d fit into the civil drafter position you\'re pursuing.  Pinpoint the specifics of the skills while at the same time your strengths with each and how you came to learn and use them.  Choose an example from past experience that highlights your problem solving abilities as well as your critical thinking processes.  This should be a brief overview type of answer.  Too many details, unless asked for, can bog you down and sidetrack the conversation so take care to give the interviewer highlights as opposed to going over every little thing.',
      'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFurw',
      'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFuvG'
    }, {
      'questionsText': 'This position requires a variety of problem solving, deductive and inductive reasoning abilities. Prove to me that you possess those. ',
      'status': 'active',
      'coachsTip': 'The interviewer is looking broadly at how talented and capable you are to perform in the electrical engineering technician position you\'re interviewing for.  They\'re also looking at the strength of that talent foundation and the potential to build on it in the future.  You should give examples and be able to point to specific deductive reasoning and problem solving accomplishments in your response but how you answer is as important as what you answer, especially with this particular line of questioning.  Showing positive body language and having an upbeat, energetic tone of voice can go a long way.',
      'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFukY',
      'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFuLM'
    }, {
      'questionsText': 'What event or effort you made would you say would be a good example of your problem solving skills? Do you have a portfolio?',
      'status': 'active',
      'coachsTip': 'You\'re being asked here to detail your demonstrated and observable problem solving skills but' +
      ' merely saying \'yes, I can do that\' doesn\'t clearly demonstrate how well you\'d be able to do them in the property manager position.  So choose an example from past experience that highlights your abilities and showcases your unique problem solving accomplishments.  One good way to help you structure something like this is the STAR technique.  STAR is a simple strategy that will help you focus your answers and stands for Situation, Task, Action and Result.  Describe the situation, the tasks involved, the actions you took and the results you achieved.  You want to be brief and to the point.  Too many details, unless asked for, can bog you down and sidetrack the conversation so take care to give the interviewer highlights as opposed to going over every little thing.',
      'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFD09',
      'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFDnH'
    }];

    // expect when model changes to be propagated to iPrepCtrl
    expect(iPrepCtrl.questions.length).toBe(24);

    // reset model to confirm
    iPrepModel.searchQuestions = [];

    expect(iPrepCtrl.questions.length).toBe(24);
  });


  it('iPrep.goToSearch', function () {
    var iPrepCtrl, localStorageService, $state;

    iPrepCtrl = $controller('InterviewPrepController', {$scope: $rootScope.$new()});


    localStorageService = $injector.get('localStorageService');
    spyOn(localStorageService, 'set').and.returnValue(null);

    $state = $injector.get('$state');
    spyOn($state, 'go').and.returnValue(null);


    iPrepCtrl.goToSearch();
    expect(localStorageService.set.calls.count()).toBe(0);
    expect($state.go.calls.count()).toBe(0);

    iPrepCtrl.goToSearch('skill');
    expect(localStorageService.set.calls.count()).toBe(1);
    expect($state.go.calls.count()).toBe(1);
  });

  it('iPrep.onSlideChanged', function () {
    var iPrepCtrl, iPrepModel;

    iPrepModel = $injector.get('InterviewPrepViewModel');
    // Initialize it to empty objects.
    iPrepModel.faqs = [{}, {}, {}];

    iPrepCtrl = $controller('InterviewPrepController', {$scope: $rootScope.$new()});

    expect(iPrepCtrl.curIndex).toBe(0);
    expect(iPrepCtrl.questions[1].visited).toEqual(undefined);

    iPrepCtrl.onSlideChanged(1);

    expect(iPrepCtrl.curIndex).toBe(1);
    expect(iPrepCtrl.questions[1].visited).toEqual(true);
  });

  it('iPrep.inTimelineView', function () {
    var value, scope;

    scope = $rootScope.$new();
    $controller('InterviewPrepController', {$scope: scope});

    value = scope.inTimelineView(1, 1);
    expect(value).toBe(true);

    value = scope.inTimelineView(2, 1);
    expect(value).toBe(true);

    value = scope.inTimelineView(3, 1);
    expect(value).toBe(true);

    value = scope.inTimelineView(5, 1);
    expect(value).toBe(false);

    value = scope.inTimelineView(1, 2);
    expect(value).toBe(false);

  });

});

describe('Controller: InterviewPreparationSearch', function () {
  var $injector, iPrepModel, $httpBackend, $controller, $rootScope;

  beforeEach(function () {
    module('interviewPreparation.vm');
    module('interviewPreparation');
    module('partitionFilter');
    module('ui.router');
    module('LocalStorageModule');

    inject(function (_$injector_) {
      $injector = _$injector_;

      iPrepModel = $injector.get('InterviewPrepViewModel');

      $httpBackend = $injector.get('$httpBackend');

      $controller = $injector.get('$controller');

      $rootScope = $injector.get('$rootScope');

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

      //stub model with faqs with static response.
      $httpBackend.expectGET(/\/api\/interview\/optimal-interview\/questions\?api_module=optimal-interview&api_service=questions&api_service_operation=list-collection&playlist_id=AFFr18&status=active/).respond(angular.toJson(data));

    });
  });


  afterEach(function () {
    $injector = iPrepModel = $httpBackend = $controller = $rootScope = undefined;
  });

  it('Initialization of controller', function () {
    var iPrepCtrl;
    iPrepCtrl = $controller('InterviewPrepSearchController');

    expect(iPrepCtrl.getQuestions).toBeDefined();
    expect(iPrepCtrl.goToFaq).toBeDefined();
    expect(iPrepCtrl.init).toBeDefined();
    expect(iPrepCtrl.searchQuestions).toBeDefined();
  });


  it('iPrep.getQuestions::', function () {
    var iPrepCtrl, $q, response;

    iPrepCtrl = $controller('InterviewPrepSearchController');

    $q = $injector.get('$q');

    spyOn(iPrepModel, 'getQuestions').and.callFake(function () {

      iPrepModel.searchQuestions = [{
        'questionsText': 'Communication skills and problem solving' +
        ' skills are important to this position. Give examples that would show to me that you possess these skills.',
        'status': 'active',
        'coachsTip': 'The interviewer is looking for the specifics of your demonstrated, repeatable communications skills.  You may think it\'s a simple enough question but unless you portray confidence and validate that you have these skills, you may not be going far enough with your answer.  Be sure to pay attention to describing how you acquired and practiced the skills, over what time frame, how easy or hard they were to master and whether this is something that you enjoy doing.  The example used in your response should be detailed and fully explained, yet brief enough to keep the interviewer\'s interest.  Too much information can be as bad as not enough.',
        'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFDMW',
        'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFDtI'
      }, {
        'questionsText': 'Complex problem solving with a strong attention to detail are important to this biological technician position. How would you demonstrate that you possess those skills?',
        'status': 'active',
        'coachsTip': 'Merely laundry listing your skills or saying \'yes, I can do that\' doesn\'t explain how well you can do them and how well you\'d fit into the biological technician position you\'re pursuing.  Pinpoint the specifics of the skills while at the same time your strengths with each and how you came to learn and use them.  Choose an example from past experience that highlights your problem solving abilities as well as your attention to detail.  This should be a brief overview type of answer.  Too many details, unless asked for, can bog you down and sidetrack the conversation so take care to give the interviewer highlights as opposed to going over every little thing.',
        'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFDyI',
        'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFuAZ'
      }, {
        'questionsText': 'Do you have any examples that would show me your use of deductive reasoning and complex problem solving?',
        'status': 'active',
        'coachsTip': 'The interviewer is looking broadly at how talented and capable you are to perform in the' +
        ' chemist position you\'re interviewing for.  They\'re also looking at the strength of that talent foundation and the potential to build on it in the future.  You should give examples and be able to point to specific deductive reasoning accomplishments in your response but how you answer is as important as what you answer, especially with this particular line of questioning.  Showing positive body language and having an upbeat, energetic tone of voice can go a long way.',
        'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFuAx',
        'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFuvc'
      }, {
        'questionsText': 'Give an example that would help me to understand your skills for complex problem solving. Tell me about your critical thinking skills.',
        'status': 'active',
        'coachsTip': 'Merely laundry listing your skills or saying \'yes, I can do that\' doesn\'t explain how well you can do them and how well you\'d fit into the civil drafter position you\'re pursuing.  Pinpoint the specifics of the skills while at the same time your strengths with each and how you came to learn and use them.  Choose an example from past experience that highlights your problem solving abilities as well as your critical thinking processes.  This should be a brief overview type of answer.  Too many details, unless asked for, can bog you down and sidetrack the conversation so take care to give the interviewer highlights as opposed to going over every little thing.',
        'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFurw',
        'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFuvG'
      }, {
        'questionsText': 'This position requires a variety of problem solving, deductive and inductive reasoning abilities. Prove to me that you possess those. ',
        'status': 'active',
        'coachsTip': 'The interviewer is looking broadly at how talented and capable you are to perform in the electrical engineering technician position you\'re interviewing for.  They\'re also looking at the strength of that talent foundation and the potential to build on it in the future.  You should give examples and be able to point to specific deductive reasoning and problem solving accomplishments in your response but how you answer is as important as what you answer, especially with this particular line of questioning.  Showing positive body language and having an upbeat, energetic tone of voice can go a long way.',
        'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFukY',
        'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFuLM'
      }, {
        'questionsText': 'What event or effort you made would you say would be a good example of your problem solving skills? Do you have a portfolio?',
        'status': 'active',
        'coachsTip': 'You\'re being asked here to detail your demonstrated and observable problem solving skills but' +
        ' merely saying \'yes, I can do that\' doesn\'t clearly demonstrate how well you\'d be able to do them in the property manager position.  So choose an example from past experience that highlights your abilities and showcases your unique problem solving accomplishments.  One good way to help you structure something like this is the STAR technique.  STAR is a simple strategy that will help you focus your answers and stands for Situation, Task, Action and Result.  Describe the situation, the tasks involved, the actions you took and the results you achieved.  You want to be brief and to the point.  Too many details, unless asked for, can bog you down and sidetrack the conversation so take care to give the interviewer highlights as opposed to going over every little thing.',
        'coachingVideo': 'https://api.optimalresume.com/optimal-interview/media/coaching/AFFD09',
        'questionVideo': 'https://api.optimalresume.com/optimal-interview/media/question/AFFDnH'
      }];

      iPrepModel.searchQuestions.pageCount = 1;

      return $q.defer().promise;
    });


    expect(iPrepCtrl.getQuestions).toBeDefined();
    expect(iPrepModel.getQuestions.calls.count()).toEqual(0);

    iPrepCtrl.init();

    // No query
    expect(response).toBeUndefined();
    response = iPrepCtrl.getQuestions();
    expect(response).toBe((false));
    expect(iPrepModel.getQuestions.calls.count()).toBe((0));

    // Reset spy and response
    iPrepModel.getQuestions.calls.reset();
    response = undefined;

    // simple query
    expect(response).toBeUndefined();
    response = iPrepCtrl.getQuestions('problem solving');
    expect(angular.isObject(response)).toBe(true);
    expect(iPrepModel.getQuestions.calls.count()).toBe(1);
    expect(iPrepModel.getQuestions.calls.argsFor(0)[0].question_text ).toEqual('problem solving'); // jshint ignore:line
    expect(iPrepModel.getQuestions.calls.argsFor(0)[0].page).toEqual(1);


    // Reset spy and response
    iPrepModel.getQuestions.calls.reset();
    response = undefined;

    expect(response).toBeUndefined();
    // query for specific page.
    response = iPrepCtrl.getQuestions('problem solving', 2);
    expect(angular.isObject(response)).toBe(true);
    expect(iPrepModel.getQuestions.calls.count()).toBe(1);
    expect(iPrepModel.getQuestions.calls.argsFor(0)[0].question_text).toEqual('problem solving'); // jshint ignore:line
    expect(iPrepModel.getQuestions.calls.argsFor(0)[0].page).toEqual(2);

  });

  it('iPrep.init with no saved query should not invoke a search', function () {
    var iPrepCtrl, localStorageService;
    localStorageService = $injector.get('localStorageService');

    iPrepCtrl = $controller('InterviewPrepSearchController');
    spyOn(iPrepCtrl, 'getQuestions').and.returnValue([]);

    expect(iPrepCtrl.getQuestions.calls.count()).toBe((0));

    localStorageService.clearAll();
    iPrepCtrl.init();

    expect(iPrepCtrl.getQuestions.calls.count()).toBe((0));

    // reset spies
    spyOn(localStorageService, 'get').and.returnValue( angular.toJson({query: 'skill', page: 1}) );

    iPrepCtrl.getQuestions.calls.reset();

    iPrepCtrl.init();

    expect(iPrepCtrl.getQuestions.calls.count()).toBe((1));
  });
});
