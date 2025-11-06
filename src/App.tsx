import React from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";

function App() {
  return (
    <Layout>
      <Header />
      <main className="main">
        {/* We'll move other sections here as we convert them to components */}
      </main>
    </Layout>
  );
}

export default App;
