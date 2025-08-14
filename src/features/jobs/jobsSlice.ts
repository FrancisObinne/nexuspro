import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Job {
  id: string;
  title?: string;
  company?: string;
  location?: string;
  type?: string;
  salary?: string;
  postedAgo?: string;
  description?: string;
}

interface JobsState {
  jobs: Job[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  status: "idle",
  error: null,
};

// Dummy data to simulate fetching from a database
const dummyJobs: Job[] = [
  {
    id: "1",
    title: "Chief Executive Manager in LA",
    company: "Titan Incorporated",
    location: "Las Angeles, CA",
    type: "Full Time",
    salary: "200k - 250k",
    postedAgo: "5d ago",
    description:
      "We're looking for a Chief Executive Manager in LA to join our team...",
  },
  {
    id: "2",
    title: "Director of Operations",
    company: "Apex Builders Inc.",
    location: "New York, NY",
    type: "Full Time",
    salary: "180k - 220k",
    postedAgo: "2h ago",
    description:
      "We are seeking a seasoned Director of Operations to lead our team...",
  },
  {
    id: "3",
    title: "Senior Marketing Executive",
    company: "Stellar Innovations Co.",
    location: "Remote",
    type: "Part Time",
    salary: "120k - 150k",
    postedAgo: "1d ago",
    description:
      "Join our marketing team to drive strategic initiatives and brand growth...",
  },
  {
    id: "4",
    title: "Chief Financial Officer",
    company: "Global Ventures",
    location: "Houston, TX",
    type: "Full Time",
    salary: "250k - 300k",
    postedAgo: "1w ago",
    description:
      "Oversee all financial operations and planning for our global enterprise...",
  },
];

// Async Thunk for fetching jobs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  // Simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyJobs;
});

// Async Thunk for creating a new job
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (newJobData: Omit<Job, "id" | "postedAgo">) => {
    // Simulate an API call to save a new job
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newJob = {
      ...newJobData,
      id: uuidv4(),
      postedAgo: "Just now",
    };
    return newJob;
  }
);

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch jobs";
      })
      .addCase(createJob.fulfilled, (state, action: PayloadAction<Job>) => {
        state.jobs.unshift(action.payload);
      });
  },
});

export default jobsSlice.reducer;
