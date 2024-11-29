import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createComment,
  deleteCommentService,
  getCommentById,
  getComments,
  getCommentsByCardCommentsIds,
  updateCommentService,
} from "../api/commentServices";

// Fetch all comments
export const fetchAllComments = createAsyncThunk(
  "comments/fetchAllComments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getComments();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchCommentById = createAsyncThunk(
  "comments/fetchCommentById",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await getCommentById(commentId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// Fetch a single comment by ID
export const fetchCommentsByCardCommentsIds = createAsyncThunk(
  "comments/fetchCommentsByCardCommentsIds",
  async (commentIds, { rejectWithValue }) => {
    try {
      const response = await getCommentsByCardCommentsIds(commentIds);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Create a new comment
export const createNewComment = createAsyncThunk(
  "comments/createNewComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await createComment(commentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Update an  comment
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await updateCommentService(commentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await deleteCommentService(commentId);
      return commentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    loading: false,
    error: null,
    currentComment: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all comments
      .addCase(fetchCommentsByCardCommentsIds.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByCardCommentsIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByCardCommentsIds.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single comment
      .addCase(fetchCommentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentComment = action.payload;
      })
      .addCase(fetchCommentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create new comment
      .addCase(createNewComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
        state.currentComment = action.payload;
      })
      .addCase(createNewComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update comment
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedComment = action.payload;
        const index = state.comments.findIndex(
          (comment) => comment._id === updatedComment._id,
        );
        if (index !== -1) {
          state.comments[index] = updatedComment;
        }
        if (
          state.currentComment &&
          state.currentComment._id === updatedComment._id
        ) {
          state.currentComment = updatedComment;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload,
        );
        if (
          state.currentComment &&
          state.currentComment._id === action.payload
        ) {
          state.currentComment = null;
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
