import React from 'react';
import { mount } from 'enzyme';

import QuizPage from '../quizPage';

describe('quizPage', () => {

  let wrapper;

  describe('when the api errors', () => {

    it('should display the error', done => {
      fetch.mockReject(new Error('Network error'));
      wrapper = mount(<QuizPage/>);
      process.nextTick(() => {
        wrapper.find('button').simulate('click');
        fetch.mockClear();
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });
  });

  describe('when the api returns a valid payload', () => {

    beforeEach(done => {
      fetch.mockResponse(JSON.stringify([
        {
          genre: 'rock',
          albumCover: '/sex-drugs-and-sausage-rolls/',
          genreOptions: [{ value: 'rock', isCorrect: true}, { value: 'disco', isCorrect: false }]
        },
        {
          genre: 'opera',
          albumCover: '/pavarotti-lives/',
          genreOptions: [{ value: 'opera', isCorrect: true}, { value: 'techno', isCorrect: false }]
        }
      ]));
      wrapper = mount(<QuizPage/>);
      process.nextTick(() => {
        wrapper.find('button').simulate('click');
        fetch.mockClear();
        done();
      });
    });

    it('should display the game when starting', () => {
      expect(wrapper.find('Game')).toMatchSnapshot();
    });

    it('should indicate when a question is answered correctly', () => {
      wrapper.find({ answer: { isCorrect: true }}).simulate('click');
      expect(wrapper.find('AnswerResult')).toMatchSnapshot();
    });

    it('should indicate when a question is answered incorrectly', () => {
      wrapper.find({ answer: { isCorrect: false }}).simulate('click');
      expect(wrapper.find('AnswerResult')).toMatchSnapshot();
    });

    it('should display the game result when all questions are answered, and restart the game', done => {
      wrapper.find({ answer: { isCorrect: false }}).simulate('click');
      wrapper.find('button').simulate('click');
      wrapper.find({ answer: { isCorrect: true }}).simulate('click');
      wrapper.find('button').simulate('click');
      expect(wrapper.find('GameResult')).toMatchSnapshot();

      fetch.mockResponse(JSON.stringify([
        {
          genre: 'country',
          albumCover: '/been-cleaning-the-barn/',
          genreOptions: [{ value: 'country', isCorrect: true}, { value: 'pop', isCorrect: false }]
        }
      ]));

      wrapper.find('button').simulate('click');
      process.nextTick(() => {
        wrapper.update();
        expect(wrapper.find('Game')).toMatchSnapshot();
        done();
      })
    });
  });
});
