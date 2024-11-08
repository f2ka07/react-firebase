import React, { useEffect, useState } from 'react';
import { ChakraProvider, Center, Spinner } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { SignInForm } from './components/auth/SignInForm';
import { CreateGroupForm } from './components/groups/CreateGroupForm';
import { GroupDashboard } from './components/groups/GroupDashboard';
import { initializeFirebase } from './lib/firebase';
import { useAuthStore } from './store/authStore';

function App() {
  const [initializing, setInitializing] = useState(true);
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const init = async () => {
      const user = await initializeFirebase();
      setUser(user);
      setInitializing(false);
    };
    init();
  }, [setUser]);

  if (initializing) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/create-group" element={<CreateGroupForm />} />
            <Route path="/group/:groupId" element={<GroupDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;