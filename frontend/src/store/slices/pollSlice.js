import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPoll: null,
  pollQuestion: '',
  pollOptions: [],
  pollId: '',
  timer: 60,
  votes: {},
  totalVotes: 0,
  selectedOption: null,
  submitted: false,
  answerStatus: null,
  pollHistory: [],
  canCreatePoll: true,
  loading: false,
  error: null,
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setCurrentPoll: (state, action) => {
      state.currentPoll = action.payload;
      state.pollQuestion = action.payload.question;
      state.pollOptions = action.payload.options;
      state.pollId = action.payload._id;
      state.timer = action.payload.timer;
      state.votes = {};
      state.selectedOption = null;
      state.submitted = false;
      state.error = null;
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    submitAnswer: (state) => {
      state.submitted = true;
    },
    updateVotes: (state, action) => {
      state.votes = action.payload;
      state.totalVotes = Object.values(action.payload).reduce((a, b) => a + b, 0);
    },
    setAnswerStatus: (state, action) => {
      state.answerStatus = action.payload;
    },
    setCanCreatePoll: (state, action) => {
      state.canCreatePoll = action.payload;
    },
    setPollHistory: (state, action) => {
      state.pollHistory = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetPoll: (state) => {
      state.currentPoll = null;
      state.pollQuestion = '';
      state.pollOptions = [];
      state.pollId = '';
      state.timer = 60;
      state.timeLeft = 0;
      state.votes = {};
      state.totalVotes = 0;
      state.selectedOption = null;
      state.submitted = false;
      state.answerStatus = null;
      state.canCreatePoll = true;
      state.error = null;
    },
  },
});

export const {
  setCurrentPoll,
  setSelectedOption,
  submitAnswer,
  updateVotes,
  setAnswerStatus,
  setCanCreatePoll,
  setPollHistory,
  setLoading,
  setError,
  clearError,
  resetPoll,
} = pollSlice.actions;

export default pollSlice.reducer;
