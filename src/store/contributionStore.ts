import create from 'zustand';
import { 
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Contribution } from '../types';

interface ContributionState {
  contributions: Contribution[];
  loading: boolean;
  error: string | null;
  makeContribution: (contributionData: Omit<Contribution, 'id'>) => Promise<void>;
  fetchGroupContributions: (groupId: string) => Promise<void>;
  fetchUserContributions: (userId: string) => Promise<void>;
  updateContributionStatus: (contributionId: string, status: 'pending' | 'completed') => Promise<void>;
}

export const useContributionStore = create<ContributionState>((set, get) => ({
  contributions: [],
  loading: false,
  error: null,

  makeContribution: async (contributionData) => {
    try {
      set({ loading: true, error: null });
      await addDoc(collection(db, 'contributions'), {
        ...contributionData,
        date: new Date(),
        status: 'pending'
      });
      await get().fetchGroupContributions(contributionData.groupId);
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchGroupContributions: async (groupId) => {
    try {
      set({ loading: true, error: null });
      const q = query(
        collection(db, 'contributions'),
        where('groupId', '==', groupId)
      );
      const snapshot = await getDocs(q);
      const contributions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Contribution[];
      set({ contributions });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchUserContributions: async (userId) => {
    try {
      set({ loading: true, error: null });
      const q = query(
        collection(db, 'contributions'),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(q);
      const contributions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Contribution[];
      set({ contributions });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateContributionStatus: async (contributionId, status) => {
    try {
      set({ loading: true, error: null });
      await updateDoc(doc(db, 'contributions', contributionId), { status });
      const contributions = get().contributions.map(contribution =>
        contribution.id === contributionId ? { ...contribution, status } : contribution
      );
      set({ contributions });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  }
}));