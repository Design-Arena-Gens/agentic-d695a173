'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface JobAlert {
  id: string
  title: string
  location: string
  keywords: string[]
  frequency: string
  active: boolean
}

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  description: string
  posted: string
  match: number
}

export default function Home() {
  const [alerts, setAlerts] = useState<JobAlert[]>([
    {
      id: '1',
      title: 'Senior Software Engineer',
      location: 'Remote',
      keywords: ['React', 'TypeScript', 'Node.js'],
      frequency: 'Daily',
      active: true
    }
  ])

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$120k - $160k',
      description: 'Looking for an experienced React developer to join our team...',
      posted: '2 hours ago',
      match: 95
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      salary: '$130k - $170k',
      description: 'Join our fast-growing startup as a full stack engineer...',
      posted: '5 hours ago',
      match: 88
    },
    {
      id: '3',
      title: 'Frontend Developer',
      company: 'BigTech Co.',
      location: 'New York, NY',
      salary: '$110k - $150k',
      description: 'Work on cutting-edge frontend technologies...',
      posted: '1 day ago',
      match: 82
    }
  ])

  const [showNewAlert, setShowNewAlert] = useState(false)
  const [newAlert, setNewAlert] = useState({
    title: '',
    location: '',
    keywords: '',
    frequency: 'Daily'
  })

  const handleCreateAlert = () => {
    if (!newAlert.title || !newAlert.keywords) return

    const alert: JobAlert = {
      id: Date.now().toString(),
      title: newAlert.title,
      location: newAlert.location || 'Any',
      keywords: newAlert.keywords.split(',').map(k => k.trim()),
      frequency: newAlert.frequency,
      active: true
    }

    setAlerts([...alerts, alert])
    setNewAlert({ title: '', location: '', keywords: '', frequency: 'Daily' })
    setShowNewAlert(false)
  }

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ))
  }

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>🤖 Job Alerts Agent</h1>
          <p className={styles.subtitle}>Your AI-powered job search assistant</p>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Your Job Alerts</h2>
            <button
              className={styles.primaryButton}
              onClick={() => setShowNewAlert(!showNewAlert)}
            >
              + New Alert
            </button>
          </div>

          {showNewAlert && (
            <div className={styles.newAlertForm}>
              <h3>Create New Alert</h3>
              <input
                type="text"
                placeholder="Job Title (e.g., Software Engineer)"
                className={styles.input}
                value={newAlert.title}
                onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Location (e.g., Remote, San Francisco)"
                className={styles.input}
                value={newAlert.location}
                onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
              />
              <input
                type="text"
                placeholder="Keywords (comma separated: React, TypeScript, Node.js)"
                className={styles.input}
                value={newAlert.keywords}
                onChange={(e) => setNewAlert({ ...newAlert, keywords: e.target.value })}
              />
              <select
                className={styles.select}
                value={newAlert.frequency}
                onChange={(e) => setNewAlert({ ...newAlert, frequency: e.target.value })}
              >
                <option value="Immediately">Immediately</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
              <div className={styles.formActions}>
                <button className={styles.primaryButton} onClick={handleCreateAlert}>
                  Create Alert
                </button>
                <button
                  className={styles.secondaryButton}
                  onClick={() => setShowNewAlert(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className={styles.alertsList}>
            {alerts.map(alert => (
              <div key={alert.id} className={styles.alertCard}>
                <div className={styles.alertHeader}>
                  <div>
                    <h3>{alert.title}</h3>
                    <p className={styles.alertLocation}>📍 {alert.location}</p>
                  </div>
                  <div className={styles.alertActions}>
                    <button
                      className={`${styles.toggleButton} ${alert.active ? styles.active : ''}`}
                      onClick={() => toggleAlert(alert.id)}
                    >
                      {alert.active ? 'Active' : 'Paused'}
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteAlert(alert.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className={styles.alertKeywords}>
                  {alert.keywords.map((keyword, i) => (
                    <span key={i} className={styles.keyword}>{keyword}</span>
                  ))}
                </div>
                <p className={styles.alertFrequency}>🔔 {alert.frequency} notifications</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Recommended Jobs</h2>
          <div className={styles.jobsList}>
            {jobs.map(job => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobHeader}>
                  <div>
                    <h3>{job.title}</h3>
                    <p className={styles.company}>{job.company}</p>
                  </div>
                  <div className={styles.matchScore}>
                    <div className={styles.matchCircle}>{job.match}%</div>
                    <span>Match</span>
                  </div>
                </div>
                <div className={styles.jobDetails}>
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                  <span>🕐 {job.posted}</span>
                </div>
                <p className={styles.jobDescription}>{job.description}</p>
                <button className={styles.applyButton}>View Details</button>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{alerts.filter(a => a.active).length}</div>
            <div className={styles.statLabel}>Active Alerts</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{jobs.length}</div>
            <div className={styles.statLabel}>New Matches</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>24/7</div>
            <div className={styles.statLabel}>Monitoring</div>
          </div>
        </section>
      </main>
    </div>
  )
}
