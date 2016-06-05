var bhram = require('./bhram.model.js');
var user = require('../user/user.model.js');
var _ = require('lodash');

var array = ['first', 'second', 'third', 'fourth'];


exports.save_questions = function (req, res) {

  var newQuestion = new bhram(req.body);

  // newQuestion.data.push();

  newQuestion.save(function (err, data) {
    res.json({
      'status': 'Saved',
      'data': data
    })
  })
};

exports.get_questions = function (req, res) {
  var level = req.params.level;
  var userId = req.user._id;
  var currentIndex = _.indexOf(array, level);
  var previousIndex = currentIndex - 1;
  var currentLevel = currentIndex + 1;
  var previousLevel = currentLevel - 1;


  user.findById(userId)

    .exec(function (err, docs) {
      if (err) {
        console.log(err);
        return;
      }
      var c = 0;
      if (level !== 'first') {

        _.forEach(docs.bhram_level_status, function (elem) {

          if (elem.level === array[previousIndex]) {
            c++;
          }
        });
      }


      if (c >= 3 || level === 'first') {
        bhram.find({'level': level})
          .select({'answer': 0, '_id': 0})
          .exec(function (err, data) {
            if (err) {
              console.log(err);
              return;
            }
            res.json({
              'status': 'received',
              'data': data
            })
          });

      } else {


        res.json({
          'status': 'cannot_proceed_furthur',
          'data': 'Solve atleast 3 ques of level ' + previousLevel + ' to unlock level ' + currentLevel
        });


      }
    });


};


exports.update_bhram_user_data = function (req, res, next) {
// console.log(req.params.level, req.params.index);
  /**
   * TODO - remove double data bonding from front end for level fouth
   * @author - ks
   * @date - 5/4/16
   * @time - 4:23 PM
   */

  var userId = req.user._id;
console.log('@AT server End', req.params.level, req.params.index);

  var status;

  if (req.params.level === 'first') {
    status = 5;
  } else if (req.params.level === 'second') {
    status = 10;
  } else if (req.params.level === 'third') {
    status = 15;
  } else {//no need to give points for level 4 question
    status = 0;
  }

  var item = {
    'level': req.params.level,
    'index': req.params.index,
    'status': status
  };

  if (req.params.level === 'fourth') {  //if question is of level fourth, then check if index of incoming question is already submitted or not; if NOT, then create [Object] for level fourth and return the no. if attempts left; if YES,it is already exists then check if total attempts are over, if over respond with [message]; if not all attempts are used then update [array] and retrun with chances left with

    var condition = {
      '_id': userId

    };

    user.findOne(condition, function (err, doc) { //find user

      if (err) {
        console.log(err);
        return;
      }

      var index_found = 0;

      var index_position = 0;



      _.forEach(doc.bhram_level5_response, function (bhram_level) {

        console.log(bhram_level.index + ' ' + req.params.index, bhram_level);

        if (bhram_level.index == req.params.index) {

          index_found = 1;

          console.log('FOUND');
          return false;
        }


        console.log('AFTER FOUND SHOULDN\'T RUN');
        index_position++;

      });

      if (index_found === 1) {  //if Index is found at level 4;then check if all attempts are over or not if not then update array with new solution

        console.log('@INDEX POSITION TO BE UPDATED', index_position);
        var count =  doc.bhram_level5_response[index_position].responses.length;

        if(count >= 5){ //length(or total submission of a question increases 5,

          res.json({
            'data': 'Not Saved! You have already submitted 5 responses!',
            'status': 'all_5_done',
            'countLeft':count,
            'index': req.params.index
          })
        }else{
          doc.bhram_level5_response[index_position].responses.push(req.params.answer);
          doc.bhram_level5_response[index_position].count = count + 1;

          doc.save(function (err, data) {
            if (err) {
              console.log(err);
              return;
            }
            res.json({
              'data': 'Data Saved!',
              'status': 'level5_save',
              'countLeft':count + 1,
              'index': req.params.index
            })
          });
        }




      } else {//if not found then create


        console.log('level 4 data store process initiated!');
        //updated the field bhram_level5_response(seperate property)
        doc.bhram_level5_response.push({
          index: req.params.index,
          responses: [req.params.answer],
          count: 1
        });

        doc.save(function (err, data) {
          // console.log(data + 'saved!!');
          if (err) {
            console.log(err);
            return;
          }
          res.json({
            'data': 'Data Saved!',
            'status': 'level5_save',
            'countLeft': 1,
            'index': req.params.index
          })
        });
        // user.bhram_level_status.responses || (user.bhram_level_status.responses = []);


        // console.log(doc.bhram_level_status.responses);
        /**
         user.findByIdAndUpdate(
         userId,
         {$push: {bhram_level_status: item}},

         {safe: true, upsert: true},

         function (err, user) {
            if (err) {
              console.log(err);
              return;
            }
            res.json({
              'data': '4 more responses are left',
              'status': 'array_updated'
            })


          });
         */


      }


    });

  } else {//for all question where level !== 'fourth'

    console.log('else++');
    bhram.findOne({'index': req.params.index, 'level': req.params.level}, function (err, data) {


      if (data.answer === req.params.answer) {


        var condition = {
          '_id': userId

        };


        /**
         * TODO-change the code for more optimization
         * Problem with var condition = {'_id': userId, 'bhram_level_status.index':req.params.index,'bhram_level_status.level': req.params.level     };
         *
         * is that, it's causing conflict b/w two level i.e. if i have completed level 2 index 1 question but not level 1 index 1 question, then while trying to solve later one it is responding {'already submitted'}
         */
        user.findOne(condition, function (err, doc) {


          if (err) {
            console.log(err);
            return;
          }


          var k = 0;

          _.forEach(doc.bhram_level_status, function (status) {

            console.log(status.index, status.level, parseInt(req.params.index, 10), req.params.level);


            if (status.index === parseInt(req.params.index, 10) && status.level === req.params.level) {  //NOT check for level fourth

              k = 1;

            }
          });

          if (k === 1) {
            res.json({
              'status': 'already_submit',
              'data': 'Already Submitted'
            })

          } else {
            console.log('not exits, so created');

            user.findByIdAndUpdate(
              userId,
              {$push: {bhram_level_status: item}},

              {safe: true, upsert: true},

              function (err, user) {
                if (err) {
                  console.log(err);
                  return;
                }
                res.json({
                  'data': 'Congrats! Correct Answer',
                  'status': 'correct'
                })


              });


          }

        });


      }
      else {
        res.json({
          'status': 'ans_not_correct',
          'data': 'Sorry! Answer isn\'t correct'
        })
      }

    })
  }


};


exports.leader_board = function (req, res) {

  console.log('===KUNAL LEADERBOARD IS CALLED=====');

  user.find({})
    .select({
      'salt': 0,
      'hashedPassword': 0,
      '_id': 0,
      'unique': 0,
      'verified': 0,
      '_v': 0,
      'profile': 0,
      'silver_coins': 0,
      'gold_coins': 0
    })
    .exec(function (err, doc) {


      console.log('+++OUTPUT EVEREY ELEMENTS+++' + doc);
      /**
       * search for question completed in user database of bhram and add all points(store in status) of a user and save in field bhram_leaderboard_score
       */
      if (err) {
        console.log(err);
        return;
      }


      _.forEach(doc, function (elements) {

        console.log('----OUTPUT Details of ONE USER AT A TIME' + elements);

        var score = 0;
        _.forEach(elements.bhram_level_status, function (bhram) {
          score += bhram.status;
        });
        console.log('TOTAL SCORE ', score);

        user.update(
          {'email': elements.email},
          {'bhram_leaderboard_score': score},
          {multi: true},
          function (err, docAffected) {
            if (err) {
              console.log(err);
              return;
            }
            console.log('updated with BHRAM_LeaderBoard_score', docAffected);
          });

      });

      user
        .find({})
        .select({'bhram_leaderboard_score': 1, 'name': 1, 'rollno': 1})
        .sort({'bhram_leaderboard_score': -1})
        .exec(function (err, doc) {
          res.json({
            'status': 'bhram_leaderboard_info',
            'data': doc
          })
        })


    });


};
