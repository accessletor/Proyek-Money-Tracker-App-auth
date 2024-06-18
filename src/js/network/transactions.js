// // import axios from 'axios';
// // import Config from '../config/config';
// // import Utils from '../utils/utils';
// // import ApiEndpoint from '../config/api-endpoint';
// import { auth, db } from '../utils/firebase';
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   updateDoc,
//   where,
// } from 'firebase/firestore';
 
// const Transactions = {
//   async getAll() {
//     const transactionsRef = collection(db, 'transactions');
//     const transactionsQuery = query(transactionsRef, where('userId', '==', auth.currentUser.uid));
//     const querySnapshot = await getDocs(transactionsQuery);
//     const transactions = [];
//     querySnapshot.forEach((item) => {
//       transactions.push({
//         id: item.id,
//         ...item.data(),
//       });
//     });
//     return transactions;
//   },
//   async getById(id) {
//     const transactionRef = doc(db, 'transactions', id);
//     const docSnapshot = await getDoc(transactionRef);
//     return docSnapshot.data();
//   },


  
//   async store({ name, date, amount, type, description, evidence }) {
//     const transactionsRef = collection(db, 'transactions');
//     const data = { name, date, amount, type, description, evidence };
//     return await addDoc(transactionsRef, {
//       ...data,
//       userId: auth.currentUser.uid,
//     });
//   },
 
//   async update({ id, name, date, amount, type, description, evidence }) {
//     const transactionRef = doc(db, 'transactions', id);
//     const data = { name, date, amount, type, description, evidence };
//     return await updateDoc(transactionRef, data);
//   },
//   async destroy(id) {
//     const transactionRef = doc(db, 'transactions', id);
//     return await deleteDoc(transactionRef);
//   },
// };
 
// export default Transactions;

import { auth, db } from '../utils/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const Transactions = {
  async getAll() {
    const transactionsRef = collection(db, 'transactions');
    const transactionsQuery = query(transactionsRef, where('userId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(transactionsQuery);
    const transactions = [];
    querySnapshot.forEach((item) => {
      transactions.push({
        id: item.id,
        ...item.data(),
      });
    });
    return transactions;
  },

  async getById(id) {
    try {
      const transactionRef = doc(db, 'transactions', id);
      const docSnapshot = await getDoc(transactionRef);
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };
      } else {
        throw new Error('Transaction not found');
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error; // rethrow the error for the caller to handle
    }
  },

  async store({ name, date, amount, type, description, evidence }) {
    try {
      const transactionsRef = collection(db, 'transactions');
      const data = { name, date, amount, type, description, evidence, userId: auth.currentUser.uid };
      return await addDoc(transactionsRef, data);
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error; // rethrow the error for the caller to handle
    }
  },

  async update({ id, name, date, amount, type, description, evidence }) {
    try {
      const transactionRef = doc(db, 'transactions', id);
      const data = { name, date, amount, type, description, evidence };
      return await updateDoc(transactionRef, data);
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error; // rethrow the error for the caller to handle
    }
  },

  async destroy(id) {
    try {
      const transactionRef = doc(db, 'transactions', id);
      return await deleteDoc(transactionRef);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error; // rethrow the error for the caller to handle
    }
  },
};

export default Transactions;
