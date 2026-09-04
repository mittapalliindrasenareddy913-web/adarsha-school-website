import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Save, Plus, Trash2, BookOpen, Sparkles, Award, Calendar, Heart, ShieldCheck } from 'lucide-react';
import MediaUploader from '../../components/MediaUploader';
import { useSiteSettings } from '../../context/SiteContext';

export default function AboutAdmin() {
  const { refreshSiteSettings } = useSiteSettings();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const [schoolFullName, setSchoolFullName] = useState('Adarsha High School');
  const [aboutData, setAboutData] = useState({
    heroSubtitle: '',
    introduction: '',
    history: '',
    vision: '',
    mission: '',
    philosophy: '',
    approach: '',
    studentDevelopment: '',
    additionalInfo: '',
    aboutImage: '',
    journey: [],
    values: []
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.adminGetSettings();
        if (res.success && res.data) {
          const s = res.data;
          if (s.schoolFullName) setSchoolFullName(s.schoolFullName);
          const a = s.about || {};
          setAboutData({
            heroSubtitle: a.heroSubtitle || 'Adarsha High School provides a structured, supportive learning environment dedicated to developing curious, responsible, and ethical students.',
            introduction: a.introduction || '',
            history: a.history || '',
            vision: a.vision || 'To be a leading educational institution in the region recognized for fostering academic excellence, moral integrity, and modern technological readiness in young learners.',
            mission: a.mission || 'To empower every student through conceptual learning, disciplined habits, sports participation, and moral values in a supportive, safe educational atmosphere.',
            philosophy: a.philosophy || '',
            approach: a.approach || '',
            studentDevelopment: a.studentDevelopment || '',
            additionalInfo: a.additionalInfo || '',
            aboutImage: a.aboutImage || '',
            journey: Array.isArray(a.journey) && a.journey.length ? a.journey : [
              { year: '2005', title: 'Foundation', description: 'Established with primary grades to serve local families.' },
              { year: '2012', title: 'High School Expansion', description: 'Upgraded facility to High School state board recognition.' },
              { year: '2020', title: 'Digital Infrastructure', description: 'Introduced smart classrooms and computer lab facilities.' },
              { year: '2026', title: 'Modern Campus Upgrade', description: 'Expanded campus facilities and sports infrastructure.' }
            ],
            values: Array.isArray(a.values) && a.values.length ? a.values : [
              { name: 'Excellence', desc: 'Striving for high standards in academic and personal growth.' },
              { name: 'Integrity', desc: 'Upholding honesty, respect, and ethical principles in all actions.' },
              { name: 'Curiosity', desc: 'Encouraging continuous questioning, discovery, and active learning.' },
              { name: 'Compassion', desc: 'Fostering empathy, kindness, and strong community responsibility.' }
            ]
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    try {
      const res = await api.adminUpdateAboutSettings({
        schoolFullName,
        about: aboutData
      });
      setSaving(false);
      if (res.success) {
        if (res.data?.about) {
          setAboutData(res.data.about);
        }
        if (res.data?.schoolFullName) {
          setSchoolFullName(res.data.schoolFullName);
        }
        await refreshSiteSettings();
        setMsg('About School content updated successfully!');
      } else {
        setMsg('Failed to update About School content.');
      }
    } catch (err) {
      setSaving(false);
      setMsg('Server error while saving settings.');
    }
  };

  // Milestone / Journey Helpers
  const addMilestone = () => {
    setAboutData({
      ...aboutData,
      journey: [...aboutData.journey, { year: '', title: '', description: '' }]
    });
  };

  const updateMilestone = (index, field, value) => {
    const updated = [...aboutData.journey];
    updated[index][field] = value;
    setAboutData({ ...aboutData, journey: updated });
  };

  const removeMilestone = (index) => {
    setAboutData({
      ...aboutData,
      journey: aboutData.journey.filter((_, i) => i !== index)
    });
  };

  // Core Values Helpers
  const addValue = () => {
    setAboutData({
      ...aboutData,
      values: [...aboutData.values, { name: '', desc: '' }]
    });
  };

  const updateValue = (index, field, value) => {
    const updated = [...aboutData.values];
    updated[index][field] = value;
    setAboutData({ ...aboutData, values: updated });
  };

  const removeValue = (index) => {
    setAboutData({
      ...aboutData,
      values: aboutData.values.filter((_, i) => i !== index)
    });
  };

  if (loading) return <div className="p-8 text-amber-400 font-bold text-sm">Loading About School Settings...</div>;

  return (
    <div className="space-y-8 font-sans pb-16">
      <SEO title="About School Manager | Admin CMS" />

      <div>
        <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">About School Content Manager</h1>
        <p className="text-xs font-semibold text-[#6e5d5c]">Manage school story, history, vision & mission, and educational values displayed on the public About page.</p>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 text-xs">
        
        {/* 1. BASIC SCHOOL INFORMATION */}
        <div className="space-y-4 border-b border-slate-800 pb-6">
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>School Identification</span>
          </h3>

          <div>
            <label className="block font-bold text-slate-300 mb-1">School Full Name</label>
            <input
              type="text"
              value={schoolFullName}
              onChange={(e) => setSchoolFullName(e.target.value)}
              placeholder="e.g. Adarsha High School"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">About Page Subtitle / Tagline</label>
            <textarea
              rows="2"
              value={aboutData.heroSubtitle}
              onChange={(e) => setAboutData({ ...aboutData, heroSubtitle: e.target.value })}
              placeholder="Brief introductory line shown under the main heading..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
            />
          </div>
        </div>

        {/* 2. SCHOOL STORY & HISTORY */}
        <div className="space-y-4 border-b border-slate-800 pb-6">
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>School Story, Introduction & History</span>
          </h3>

          <div>
            <label className="block font-bold text-slate-300 mb-1">School Introduction (Detailed Overview)</label>
            <p className="text-[11px] text-slate-400 mb-2">Whatever text you write here will appear on the public About page. Separate paragraphs with a blank line.</p>
            <textarea
              rows="5"
              value={aboutData.introduction}
              onChange={(e) => setAboutData({ ...aboutData, introduction: e.target.value })}
              placeholder="Enter detailed school introduction..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">School History & Origin</label>
            <p className="text-[11px] text-slate-400 mb-2">Enter the historical background, founding story, and growth of the school over the years.</p>
            <textarea
              rows="5"
              value={aboutData.history}
              onChange={(e) => setAboutData({ ...aboutData, history: e.target.value })}
              placeholder="Enter detailed school history..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm leading-relaxed"
            />
          </div>

          <MediaUploader
            mode="image"
            category="About"
            label="About Page Feature Image"
            value={aboutData.aboutImage}
            onChange={(url) => setAboutData({ ...aboutData, aboutImage: url })}
            theme="dark"
          />
        </div>

        {/* 3. VISION & MISSION */}
        <div className="space-y-4 border-b border-slate-800 pb-6">
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Vision & Mission Statements</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Vision Statement</label>
              <textarea
                rows="4"
                value={aboutData.vision}
                onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
                placeholder="School vision statement..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Mission Statement</label>
              <textarea
                rows="4"
                value={aboutData.mission}
                onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
                placeholder="School mission statement..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* 4. EDUCATIONAL PHILOSOPHY & APPROACH */}
        <div className="space-y-4 border-b border-slate-800 pb-6">
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Educational Philosophy & Approach</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Educational Philosophy</label>
              <textarea
                rows="4"
                value={aboutData.philosophy}
                onChange={(e) => setAboutData({ ...aboutData, philosophy: e.target.value })}
                placeholder="Child-centric learning principles..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Teaching & Learning Approach</label>
              <textarea
                rows="4"
                value={aboutData.approach}
                onChange={(e) => setAboutData({ ...aboutData, approach: e.target.value })}
                placeholder="Classroom methods, interactive learning..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Student Development & Holistic Care</label>
              <textarea
                rows="3"
                value={aboutData.studentDevelopment}
                onChange={(e) => setAboutData({ ...aboutData, studentDevelopment: e.target.value })}
                placeholder="Co-curricular, sports, and well-being details..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Additional School Information</label>
              <textarea
                rows="3"
                value={aboutData.additionalInfo}
                onChange={(e) => setAboutData({ ...aboutData, additionalInfo: e.target.value })}
                placeholder="Board recognitions, affiliations, campus notes..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* 5. MILESTONES & JOURNEY TIMELINE */}
        <div className="space-y-4 border-b border-slate-800 pb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>School Milestones & Journey Timeline</span>
            </h3>
            <button
              type="button"
              onClick={addMilestone}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Milestone</span>
            </button>
          </div>

          {aboutData.journey.length === 0 ? (
            <p className="text-slate-400 italic text-xs">No milestones added yet. Click "Add Milestone" to add school history timeline items.</p>
          ) : (
            <div className="space-y-4">
              {aboutData.journey.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-400 text-xs">Milestone #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeMilestone(idx)}
                      className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1">Year</label>
                      <input
                        type="text"
                        value={item.year}
                        onChange={(e) => updateMilestone(idx, 'year', e.target.value)}
                        placeholder="e.g. 2005"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateMilestone(idx, 'title', e.target.value)}
                        placeholder="e.g. High School Status Recognized"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">Description</label>
                    <textarea
                      rows="2"
                      value={item.description}
                      onChange={(e) => updateMilestone(idx, 'description', e.target.value)}
                      placeholder="Brief details about this milestone..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 6. CORE VALUES */}
        <div className="space-y-4 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Heart className="w-4 h-4 text-amber-400" />
              <span>Core Values & Pillars</span>
            </h3>
            <button
              type="button"
              onClick={addValue}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Core Value</span>
            </button>
          </div>

          {aboutData.values.length === 0 ? (
            <p className="text-slate-400 italic text-xs">No core values added yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.values.map((val, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-400 text-xs">Value #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeValue(idx)}
                      className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">Value Name</label>
                    <input
                      type="text"
                      value={val.name}
                      onChange={(e) => updateValue(idx, 'name', e.target.value)}
                      placeholder="e.g. Excellence"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">Description</label>
                    <textarea
                      rows="2"
                      value={val.desc}
                      onChange={(e) => updateValue(idx, 'desc', e.target.value)}
                      placeholder="Brief summary of this value..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SAVE BUTTON */}
        <div className="pt-6 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-4 rounded-2xl font-bold text-xs bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center gap-2 shadow-xl"
          >
            {saving ? <span>Saving Changes...</span> : <><Save className="w-4 h-4" /><span>SAVE ABOUT SCHOOL CONTENT</span></>}
          </button>
        </div>

      </form>
    </div>
  );
}
