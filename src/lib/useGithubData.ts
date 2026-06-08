'use client'

import { useEffect, useState } from 'react'

export interface GithubProfile {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  followers: number
  following: number
  public_repos: number
}

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  fork: boolean
}

const BASE = 'https://api.github.com'
const USER = 'Alirewa'

interface GithubEvent { type: string }

export function useGithubContributions() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    // Fetch up to 3 pages of events (max 300 events / last ~90 days)
    Promise.all([1, 2, 3].map((p) =>
      fetch(`${BASE}/users/${USER}/events?per_page=100&page=${p}`, {
        headers: { Accept: 'application/vnd.github+json' },
      }).then((r) => (r.ok ? r.json() : [])).catch(() => [])
    )).then((pages: GithubEvent[][]) => {
      const events = pages.flat() as GithubEvent[]
      const contributions = events.filter((e) =>
        ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent'].includes(e.type)
      ).length
      setCount(contributions)
    })
  }, [])

  return { count }
}

export function useGithubProfile() {
  const [profile, setProfile] = useState<GithubProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE}/users/${USER}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => r.json())
      .then((d) => { setProfile(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return { profile, loading }
}

export function useGithubRepos() {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [totalStars, setTotalStars] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${BASE}/users/${USER}/repos?sort=updated&per_page=50&type=public`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => r.json())
      .then((data: GithubRepo[]) => {
        const filtered = data.filter((r) => !r.fork)
        const stars = filtered.reduce((sum, r) => sum + r.stargazers_count, 0)
        setRepos(filtered)
        setTotalStars(stars)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { repos, totalStars, loading }
}
