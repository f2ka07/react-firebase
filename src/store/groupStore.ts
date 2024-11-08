import create from 'zustand';
import { 
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Group } from '../types';

interface GroupState {
  groups: Group[];
  loading: boolean;
  error: string | null;
  createGroup: (groupData: Omit<Group, 'id'>) => Promise<void>;
  updateGroup: (groupId: string, groupData: Partial<Group>) => Promise<void>;
  deleteGroup: (groupId: string) => Promise<void>;
  fetchUserGroups: (userId: string) => Promise<void>;
}

export const useGroupStore = create<GroupState>((set, get) => ({
  groups: [],
  loading: false,
  error: null,

  createGroup: async (groupData) => {
    try {
      set({ loading: true, error: null });
      await addDoc(collection(db, 'groups'), {
        ...groupData,
        createdAt: new Date()
      });
      await get().fetchUserGroups(groupData.adminId);
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateGroup: async (groupId, groupData) => {
    try {
      set({ loading: true, error: null });
      await updateDoc(doc(db, 'groups', groupId), groupData);
      const groups = get().groups.map(group =>
        group.id === groupId ? { ...group, ...groupData } : group
      );
      set({ groups });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  deleteGroup: async (groupId) => {
    try {
      set({ loading: true, error: null });
      await deleteDoc(doc(db, 'groups', groupId));
      const groups = get().groups.filter(group => group.id !== groupId);
      set({ groups });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchUserGroups: async (userId) => {
    try {
      set({ loading: true, error: null });
      const q = query(
        collection(db, 'groups'),
        where('members', 'array-contains', userId)
      );
      const snapshot = await getDocs(q);
      const groups = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Group[];
      set({ groups });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  }
}));