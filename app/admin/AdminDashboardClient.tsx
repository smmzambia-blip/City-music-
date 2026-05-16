'use client';
import { useState, useEffect } from 'react';
import { auth, db, storage } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firebase-errors';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, onSnapshot, getDocs, doc, setDoc, serverTimestamp, query, orderBy, deleteDoc } from 'firebase/firestore';
import { LayoutDashboard, Music, Users, FileText, Settings, LogOut, Plus, Palette, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/components/SettingsProvider';

export default function AdminDashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  
  const { siteTitle, tagline } = useSettings();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
         router.push('/wp-admin');
      } else {
         setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="p-10 text-center font-bold uppercase tracking-widest text-zinc-500">Loading admin...</div>;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'songs', label: 'Songs', icon: <Music className="w-5 h-5" /> },
    { id: 'artists', label: 'Artists', icon: <Users className="w-5 h-5" /> },
    { id: 'news', label: 'News', icon: <FileText className="w-5 h-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] bg-zinc-50 border border-zinc-200 rounded-3xl overflow-hidden shadow-xl -mx-4 sm:mx-0">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-zinc-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-zinc-800">
           <h2 className="text-xl font-black italic tracking-tighter uppercase text-[var(--color-primary)]">{siteTitle} Admin</h2>
           <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">{tagline}</p>
        </div>
        
        <div className="flex-1 py-4">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`w-full flex items-center gap-3 px-6 py-3 font-bold uppercase tracking-widest text-xs transition-colors ${
                 activeTab === tab.id ? 'bg-[var(--color-primary)] text-black border-r-4 border-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
               }`}
             >
               {tab.icon}
               {tab.label}
             </button>
           ))}
        </div>
        
        <div className="p-4 border-t border-zinc-800">
           <button 
             onClick={() => { auth.signOut(); router.push('/wp-admin'); }}
             className="w-full flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-red-400 font-bold uppercase tracking-widest text-xs transition-colors"
           >
             <LogOut className="w-4 h-4" />
             Log Out
           </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 bg-white p-6 md:p-10 overflow-auto h-[800px]">
         {activeTab === 'dashboard' && <DashboardView />}
         {activeTab === 'songs' && <SongsView />}
         {activeTab === 'artists' && <ArtistsView />}
         {activeTab === 'news' && <NewsView />}
         {activeTab === 'appearance' && <AppearanceView />}
         {activeTab === 'settings' && <SettingsView />}
      </div>
      
    </div>
  );
}

function DashboardView() {
  const [stats, setStats] = useState({ songs: 0, artists: 0, news: 0, plays: 0 });

  useEffect(() => {
    const songsPath = 'songs';
    const artistsPath = 'artists';
    const newsPath = 'news';

    const qSongs = query(collection(db, songsPath));
    const qArtists = query(collection(db, artistsPath));
    const qNews = query(collection(db, newsPath));

    const unsubSongs = onSnapshot(qSongs, (snap) => {
      let totalPlays = 0;
      snap.forEach(doc => {
        totalPlays += (doc.data().plays || 0);
      });
      setStats(prev => ({ ...prev, songs: snap.size, plays: totalPlays }));
    }, (err) => handleFirestoreError(err, OperationType.LIST, songsPath));

    const unsubArtists = onSnapshot(qArtists, (snap) => {
      setStats(prev => ({ ...prev, artists: snap.size }));
    }, (err) => handleFirestoreError(err, OperationType.LIST, artistsPath));

    const unsubNews = onSnapshot(qNews, (snap) => {
      setStats(prev => ({ ...prev, news: snap.size }));
    }, (err) => handleFirestoreError(err, OperationType.LIST, newsPath));

    return () => {
      unsubSongs();
      unsubArtists();
      unsubNews();
    };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-6">At a Glance</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-2xl">
           <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Songs</p>
           <p className="text-3xl font-black italic tracking-tighter">{stats.songs}</p>
        </div>
        <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-2xl">
           <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Plays</p>
           <p className="text-3xl font-black italic tracking-tighter">{stats.plays}</p>
        </div>
        <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-2xl">
           <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Artists</p>
           <p className="text-3xl font-black italic tracking-tighter">{stats.artists}</p>
        </div>
        <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-2xl">
           <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">Total News</p>
           <p className="text-3xl font-black italic tracking-tighter">{stats.news}</p>
        </div>
      </div>
    </div>
  );
}

function SongsView() {
  const [adding, setAdding] = useState(false);
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [instantIndex, setInstantIndex] = useState(true);
  
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [publishStep, setPublishStep] = useState('');
  
  useEffect(() => {
    const songsPath = 'songs';
    const q = query(collection(db, songsPath), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setSongs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, songsPath));
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if(!confirm('Are you sure you want to delete this song?')) return;
    const path = `songs/${id}`;
    try {
      await deleteDoc(doc(db, 'songs', id));
    } catch (err: any) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const handlePublish = async () => {
    if(!title || !artist || !audioUrl || !coverFile) return alert('All fields including cover image are required');
    if(!auth.currentUser) return alert('Not authenticated');
    
    setSubmitting(true);
    setPublishStep('Uploading cover art...');
    let songId = '';
    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
      songId = slug.substring(0, 128);
      
      let imageUrl = '';
      if (coverFile) {
        const fileRef = ref(storage, `song-covers/${songId}-${coverFile.name}`);
        const uploadTask = uploadBytesResumable(fileRef, coverFile);
        
        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setPublishStep(`Uploading Cover: ${Math.round(progress)}%`);
            }, 
            (error) => reject(error), 
            () => resolve(null)
          );
        });
        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
      }
      
      setPublishStep('Saving song data...');
      await setDoc(doc(db, 'songs', songId), {
        title,
        artist,
        audioUrl,
        coverImage: imageUrl,
        description: description || '',
        plays: 0,
        slug,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setPublishStep('Success!');
      alert('Song Published!');
      setTitle(''); setArtist(''); setAudioUrl(''); setCoverFile(null); setDescription('');
      setAdding(false);
    } catch(err: any) {
      handleFirestoreError(err, OperationType.WRITE, `songs/${songId}`);
    } finally {
      setSubmitting(false);
      setPublishStep('');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
         <h2 className="text-2xl font-black italic tracking-tighter uppercase">Manage Songs</h2>
         <button onClick={() => setAdding(!adding)} className="flex items-center gap-2 bg-[var(--color-primary)] text-black px-4 py-2 rounded-full font-black uppercase tracking-widest text-xs hover:bg-black hover:text-[var(--color-primary)] transition">
           {adding ? 'Cancel' : <><Plus className="w-4 h-4"/> Add New</>}
         </button>
       </div>
       
       {adding ? (
          <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl">
            <h3 className="font-black uppercase tracking-widest text-sm mb-4">Post a new song</h3>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Title</label><input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" placeholder="Song Title" /></div>
              <div><label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Artist</label><input type="text" value={artist} onChange={(e)=>setArtist(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" placeholder="Artist Name" /></div>
              <div><label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Audio URL (Google Drive/S3/Direct)</label><input type="text" value={audioUrl} onChange={(e)=>setAudioUrl(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" placeholder="https://..." /></div>
              <div><label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Description (Optional)</label><textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" rows={3} placeholder="Song description, lyrics, etc..." /></div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Cover Art Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)} 
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" 
                />
                {coverFile && <img src={URL.createObjectURL(coverFile)} alt="Cover Preview" className="mt-4 w-32 h-32 object-cover rounded-xl shadow-md border border-zinc-200" />}
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="google-index-song" 
                  checked={instantIndex}
                  onChange={(e) => setInstantIndex(e.target.checked)}
                  className="w-5 h-5 accent-[var(--color-primary)] cursor-pointer" 
                />
                <label htmlFor="google-index-song" className="text-xs font-black uppercase tracking-widest text-black cursor-pointer">
                  Trigger Instant Google Indexing
                </label>
              </div>

              <button onClick={handlePublish} disabled={submitting} className="bg-black text-white px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[var(--color-primary)] hover:text-black transition">
                 {submitting ? (publishStep || 'Publishing...') : 'Publish Song'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {songs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {songs.map(song => (
                  <div key={song.id} className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-200 rounded-2xl hover:border-black transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-200 rounded-lg overflow-hidden shrink-0 shadow-inner">
                        {song.coverImage && <img src={song.coverImage} className="w-full h-full object-cover" alt={song.title} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-black line-clamp-1">{song.title}</h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{song.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleDelete(song.id)} className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-50 border border-zinc-100 rounded-2xl">
                 <Music className="w-10 h-10 mx-auto text-zinc-300 mb-4" />
                 <p className="font-bold uppercase tracking-widest text-zinc-400 text-xs">{loading ? 'Loading...' : 'No songs uploaded yet.'}</p>
              </div>
            )}
          </div>
        )}
    </div>
  );
}

function ArtistsView() {
  const [adding, setAdding] = useState(false);
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [saveStep, setSaveStep] = useState('');

  useEffect(() => {
    const path = 'artists';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setArtists(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, path));
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if(!confirm('Are you sure you want to delete this artist?')) return;
    const path = `artists/${id}`;
    try {
      await deleteDoc(doc(db, 'artists', id));
    } catch (err: any) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const handleSave = async () => {
    if(!name || !biography || !photoFile) return alert('All fields including photo are required');
    if(!auth.currentUser) return alert('Not authenticated');
    
    setSubmitting(true);
    setSaveStep('Uploading photo...');
    let artistId = '';
    try {
      artistId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 100) + '-' + Date.now();
      
      let photoUrl = '';
      if (photoFile) {
        const fileRef = ref(storage, `artist-photos/${artistId}-${photoFile.name}`);
        const uploadTask = uploadBytesResumable(fileRef, photoFile);
        
        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setSaveStep(`Uploading Photo: ${Math.round(progress)}%`);
            }, 
            (error) => reject(error), 
            () => resolve(null)
          );
        });
        photoUrl = await getDownloadURL(uploadTask.snapshot.ref);
      }
      
      setSaveStep('Saving artist profile...');
      await setDoc(doc(db, 'artists', artistId), {
        name,
        biography,
        photoUrl,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setSaveStep('Success!');
      alert('Artist Added!');
      setName(''); setBiography(''); setPhotoFile(null);
      setAdding(false);
    } catch(err: any) {
      handleFirestoreError(err, OperationType.WRITE, `artists/${artistId}`);
    } finally {
      setSubmitting(false);
      setSaveStep('');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
         <h2 className="text-2xl font-black italic tracking-tighter uppercase">Manage Artists</h2>
         <button onClick={()=>setAdding(!adding)} className="flex items-center gap-2 bg-[var(--color-primary)] text-black px-4 py-2 rounded-full font-black uppercase tracking-widest text-xs hover:bg-black hover:text-[var(--color-primary)] transition">
           {adding ? 'Cancel' : <><Plus className="w-4 h-4"/> Add Artist</>}
         </button>
       </div>
       
       {adding ? (
          <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl">
            <h3 className="font-black uppercase tracking-widest text-sm mb-4">Create Artist Profile</h3>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Artist Name</label><input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" placeholder="Name" /></div>
              <div><label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Biography</label><textarea value={biography} onChange={(e)=>setBiography(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" rows={4} placeholder="Artist biography..."></textarea></div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Photo Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} 
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" 
                />
                {photoFile && <img src={URL.createObjectURL(photoFile)} alt="Artist Preview" className="mt-4 w-32 h-32 object-cover rounded-xl shadow-md border border-zinc-200" />}
              </div>
              <button onClick={handleSave} disabled={submitting} className="bg-black text-white px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[var(--color-primary)] hover:text-black transition">
                 {submitting ? (saveStep || 'Saving...') : 'Save Artist'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {artists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {artists.map(artist => (
                  <div key={artist.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl hover:border-black transition-colors group relative overflow-hidden">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden shrink-0 shadow-inner">
                        {artist.photoUrl && <img src={artist.photoUrl} className="w-full h-full object-cover" alt={artist.name} />}
                      </div>
                      <h4 className="font-bold text-sm text-black line-clamp-1">{artist.name}</h4>
                    </div>
                    <button onClick={() => handleDelete(artist.id)} className="absolute top-2 right-2 p-1.5 bg-white shadow-sm rounded-full text-zinc-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-50 border border-zinc-100 rounded-2xl">
                 <Users className="w-10 h-10 mx-auto text-zinc-300 mb-4" />
                 <p className="font-bold uppercase tracking-widest text-zinc-400 text-xs">{loading ? 'Loading...' : 'No artists added yet.'}</p>
              </div>
            )}
          </div>
        )}
    </div>
  );
}

function NewsView() {
  const [adding, setAdding] = useState(false);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [instantIndex, setInstantIndex] = useState(true);

  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [publishStep, setPublishStep] = useState('');
  const [botRunning, setBotRunning] = useState(false);

  useEffect(() => {
    const path = 'news';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setNews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, path));
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if(!confirm('Are you sure you want to delete this article?')) return;
    const path = `news/${id}`;
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch (err: any) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const handlePublish = async () => {
    if(!headline || !content || !file) return alert('Headline, content, and expected featured image are required');
    if(!auth.currentUser) return alert('Not authenticated');
    
    setSubmitting(true);
    setPublishStep('Uploading image...');
    let newsId = '';
    try {
      newsId = headline.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 100) + '-' + Date.now();
      
      let imageUrl = '';
      if (file) {
        const fileRef = ref(storage, `news-images/${newsId}-${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);
        
        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setPublishStep(`Uploading Image: ${Math.round(progress)}%`);
            }, 
            (error) => reject(error), 
            () => resolve(null)
          );
        });
        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
      }
      
      setPublishStep('Saving article...');
      await setDoc(doc(db, 'news', newsId), {
        headline,
        content,
        featuredImage: imageUrl,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setPublishStep('Success!');
      alert('News Published!');
      setHeadline(''); setContent(''); setFile(null);
      setAdding(false);
    } catch(err: any) {
      handleFirestoreError(err, OperationType.WRITE, `news/${newsId}`);
    } finally {
      setSubmitting(false);
      setPublishStep('');
    }
  };

  const runBot = async () => {
    if (!auth.currentUser) return alert('Not authenticated');
    
    setBotRunning(true);
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch('/api/cron/auto-post', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      let data;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error(`Server returned non-JSON response (${res.status} ${res.statusText})`);
      }

      if (res.ok && data.success) {
        alert('Bot finished successfully! Post created: ' + data.post.headline);
      } else {
        alert('Bot failed: ' + (data.details || data.error || 'Unknown error'));
      }
    } catch (err: any) {
      alert('Network error running bot: ' + err.message);
    } finally {
      setBotRunning(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
         <h2 className="text-2xl font-black italic tracking-tighter uppercase">News & Blog</h2>
         <div className="flex gap-2">
            <button 
              onClick={runBot} 
              disabled={botRunning}
              className="flex items-center gap-2 bg-black text-[var(--color-primary)] px-4 py-2 rounded-full font-black uppercase tracking-widest text-xs hover:opacity-80 transition disabled:opacity-50"
            >
              {botRunning ? 'Bot is researching & writing...' : 'Run Auto-Post Bot'}
            </button>
            <button onClick={()=>setAdding(!adding)} className="flex items-center gap-2 bg-[var(--color-primary)] text-black px-4 py-2 rounded-full font-black uppercase tracking-widest text-xs hover:bg-black hover:text-[var(--color-primary)] transition">
              {adding ? 'Cancel' : <><Plus className="w-4 h-4"/> Publish News</>}
            </button>
         </div>
       </div>

       <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs font-medium text-zinc-600">
          <strong>Pro Tip:</strong> The "Auto-Post Bot" uses Gemini AI to automatically research and write Zambian music news. You can trigger this automatically every day by pointing a cron service to <code>/api/cron/auto-post</code>.
       </div>
       
       {adding ? (
          <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl">
            <h3 className="font-black uppercase tracking-widest text-sm mb-4">Write an Article</h3>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Headline</label><input type="text" value={headline} onChange={(e)=>setHeadline(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" placeholder="Breaking News..." /></div>
              <div><label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Content</label><textarea value={content} onChange={(e)=>setContent(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" rows={6} placeholder="Write news article here..."></textarea></div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Featured Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)} 
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" 
                />
                {file && <img src={URL.createObjectURL(file)} alt="News Preview" className="mt-4 w-32 h-32 object-cover rounded-xl shadow-md border border-zinc-200" />}
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="google-index-news" 
                  checked={instantIndex}
                  onChange={(e) => setInstantIndex(e.target.checked)}
                  className="w-5 h-5 accent-[var(--color-primary)] cursor-pointer" 
                />
                <label htmlFor="google-index-news" className="text-xs font-black uppercase tracking-widest text-black cursor-pointer">
                  Trigger Instant Google Indexing
                </label>
              </div>

              <button onClick={handlePublish} disabled={submitting} className="bg-black text-white px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[var(--color-primary)] hover:text-black transition">
                 {submitting ? (publishStep || 'Publishing...') : 'Publish Article'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {news.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {news.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-zinc-50 border border-zinc-200 rounded-[2rem] hover:border-black transition-colors group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-200 shrink-0 shadow-inner">
                      {item.featuredImage && <img src={item.featuredImage} className="w-full h-full object-cover" alt={item.headline} />}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                      <h4 className="font-bold text-sm text-black line-clamp-2 leading-tight">{item.headline}</h4>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                           {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Auto-Bot Post'}
                         </span>
                         <button onClick={() => handleDelete(item.id)} className="text-zinc-300 hover:text-red-500 transition-colors">
                           <Trash2 className="w-3.5 h-3.5" />
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-50 border border-zinc-100 rounded-2xl">
                 <FileText className="w-10 h-10 mx-auto text-zinc-300 mb-4" />
                 <p className="font-bold uppercase tracking-widest text-zinc-400 text-xs">{loading ? 'Loading...' : 'No news published yet.'}</p>
              </div>
            )}
          </div>
        )}
    </div>
  );
}

function AppearanceView() {
  const { primaryColor } = useSettings();
  const [color, setColor] = useState(primaryColor);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setColor(primaryColor);
  }, [primaryColor]);

  const handleSave = async () => {
    if (!auth.currentUser) return alert('Not authenticated');
    setSubmitting(true);
    const path = 'settings/general';
    try {
      await setDoc(doc(db, 'settings', 'general'), { primaryColor: color }, { merge: true });
      alert('Appearance Updated');
    } catch (err: any) {
      handleFirestoreError(err, OperationType.WRITE, path);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="border-b border-zinc-100 pb-4">
         <h2 className="text-2xl font-black italic tracking-tighter uppercase">Appearance</h2>
         <p className="text-zinc-500 text-sm font-medium mt-1">Customize the look and feel of ZedTunes.</p>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl">
            <h3 className="font-black uppercase tracking-widest text-sm mb-4">Brand Colors</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Primary Accents (e.g. Neon Green)</label>
                <div className="flex gap-2">
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
                  <input type="text" className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)]" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
              </div>
              <button onClick={handleSave} disabled={submitting} className="w-full bg-zinc-200 text-black px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-300 transition">
                {submitting ? 'Saving...' : 'Apply Colors'}
              </button>
            </div>
         </div>
       </div>
    </div>
  );
}

function SettingsView() {
  const { siteTitle, tagline } = useSettings();
  const [title, setTitle] = useState(siteTitle);
  const [tag, setTag] = useState(tagline);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle(siteTitle);
    setTag(tagline);
  }, [siteTitle, tagline]);

  const handleSave = async () => {
    if (!auth.currentUser) return alert('Not authenticated');
    setSubmitting(true);
    const path = 'settings/general';
    try {
      await setDoc(doc(db, 'settings', 'general'), { siteTitle: title, tagline: tag }, { merge: true });
      alert('Settings Saved');
    } catch (err: any) {
      handleFirestoreError(err, OperationType.WRITE, path);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="border-b border-zinc-100 pb-4">
         <h2 className="text-2xl font-black italic tracking-tighter uppercase">General Settings</h2>
       </div>
       
       <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl max-w-2xl">
          <div className="space-y-4">
            <div><label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Site Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" /></div>
            <div><label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Tagline</label><input type="text" value={tag} onChange={(e) => setTag(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-primary)]" /></div>
            <button onClick={handleSave} disabled={submitting} className="bg-black text-white px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs shadow-lg hover:bg-[var(--color-primary)] hover:text-black transition">
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
       </div>
    </div>
  );
}
