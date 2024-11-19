import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import { auth, db, storage } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import FindQuestions from './FindQuestion';
import SignUp from './SignUp';
import Login from './Login';
import Pricing from './Pricing';
import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';

function Home() {
  const [postType, setPostType] = useState('question');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [abstract, setAbstract] = useState('');
  const [image, setImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [code, setCode] = useState('');

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPosting(true);

    let imageUrl = '';
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      try {
        await uploadTask;
        imageUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Error uploading image: ', error);
        alert('Image upload failed: ' + error.message);
        setIsPosting(false);
        return;
      }
    }

    try {
      await addDoc(collection(db, 'posts'), {
        postType,
        title,
        description,
        tags,
        abstract,
        imageUrl,
        code,
        createdAt: new Date(),
        userId: auth.currentUser.uid,
      });
      alert('Post submitted!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to submit post: ' + error.message);
    } finally {
      setIsPosting(false);
      setTitle('');
      setDescription('');
      setTags('');
      setAbstract('');
      setImage(null);
      setCode('');
    }
  };

  return (
    <div className="App">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="post-type">
          <label>Select Post Type: </label>
          <div className="post-type-options">
            <input
              type="radio"
              value="question"
              checked={postType === 'question'}
              onChange={() => setPostType('question')}
            />
            <label>Question</label>
            <input
              type="radio"
              value="article"
              checked={postType === 'article'}
              onChange={() => setPostType('article')}
            />
            <label>Article</label>
          </div>
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {postType === 'article' && (
          <>
            <div className="form-group">
              <label>Abstract</label>
              <textarea
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" onChange={handleImageUpload} />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Code (Markdown supported)</label>
          <CodeMirror
            value={code}
            options={{
              mode: 'javascript',
              theme: 'material',
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setCode(value);
            }}
          />
        </div>

        <button type="submit" disabled={isPosting}>
          {isPosting ? 'Posting...' : 'Post'}
        </button>
      </form>

      <h2>Markdown Preview</h2>
      <div className="markdown-preview">
        <ReactMarkdown>{code}</ReactMarkdown>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Sign out failed: ' + error.message);
    }
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-brand">My Post App</div>
        <div className="nav-links">
          {user ? (
            <>
              <Link className="nav-item" to="/">Home</Link>
              <Link className="nav-item" to="/find-questions">Find Questions</Link>
              <Link className="nav-item" to="/pricing">Plans</Link>
              <button className="nav-item signout-button" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link className="nav-item" to="/login">Login</Link>
              <Link className="nav-item" to="/signup">Sign Up</Link>
              <Link className="nav-item" to="/pricing">Plans</Link>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/find-questions" element={user ? <FindQuestions /> : <Navigate to="/login" />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
