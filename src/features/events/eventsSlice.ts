import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  rsvpCount: number;
}

interface EventsState {
  events: Event[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  status: "idle",
  error: null,
};

// Async Thunk for fetching events
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const eventsCollection = collection(db, "events");
  const eventSnapshot = await getDocs(eventsCollection);
  const eventList = eventSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Event[];
  return eventList;
});

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.status = "succeeded";
          state.events = action.payload;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch events";
      });
  },
});

export default eventsSlice.reducer;
