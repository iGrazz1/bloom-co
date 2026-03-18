'use client'

import { useState } from 'react'
import {
  MessageCircle, ShoppingCart, ThumbsUp, ThumbsDown,
  Minus, Send, Edit3, Check, Filter, ChevronDown,
  AlertCircle, Sparkles, Heart, Zap,
} from 'lucide-react'

type Sentiment = 'positive' | 'neutral' | 'negative'
type CommentStatus = 'pending' | 'approved' | 'posted'

interface CommentItem {
  id: string
  author: string
  handle: string
  platform: string
  content: string
  sentiment: Sentiment
  sentimentScore: number
  isBuyingSignal: boolean
  isFeatureRequest: boolean
  isComplaint: boolean
  aiReply: string
  status: CommentStatus
  postedAt: string
  likes: number
  video: string
}

const comments: CommentItem[] = [
  { id: '1', author: 'Mia Thompson', handle: '@miawedding2026', platform: 'TikTok', content: 'OMG this is exactly what I was looking for!! How do I purchase one of these? Linking in your bio?? 😍', sentiment: 'positive', sentimentScore: 0.98, isBuyingSignal: true, isFeatureRequest: false, isComplaint: false, aiReply: 'Hi Mia! So glad you love it 🌸 You can find all our templates linked in our bio — head to Bloom & Co on Etsy. The Boho Garden suite is actually on sale right now! Would love to help you find your perfect invitation ✨', status: 'pending', postedAt: '2026-03-18T14:23:00', likes: 48, video: 'Boho Garden Wedding Invite Reveal' },
  { id: '2', author: 'Sophie Chen', handle: '@sophiechen_bride', platform: 'Instagram', content: 'These are so beautiful!! I wish you had a dusty blue version though, thats our wedding colour 💙', sentiment: 'positive', sentimentScore: 0.82, isBuyingSignal: true, isFeatureRequest: true, isComplaint: false, aiReply: 'Sophie, you have great taste! Dusty blue is such an elegant wedding palette. I\'ve actually been getting a few requests for this — adding it to my next collection! In the meantime, the Ivory & Gold suite can be easily colour-customised in Canva. DM me and I can help you adjust it 💙', status: 'pending', postedAt: '2026-03-18T12:11:00', likes: 31, video: 'Boho Garden Wedding Invite Reveal' },
  { id: '3', author: 'Rachel Kim', handle: '@rachelmkwedding', platform: 'TikTok', content: 'I bought the minimalist suite and the Canva template wouldnt open properly on my laptop. Really frustrated 😞', sentiment: 'negative', sentimentScore: 0.11, isBuyingSignal: false, isFeatureRequest: false, isComplaint: true, aiReply: 'Rachel, I\'m so sorry to hear you\'re having trouble — that must be really frustrating especially when you\'re planning your wedding! This is usually a quick fix. Please send me a DM and I\'ll personally help you get it sorted within the hour. I also want to send you a little bonus template as an apology 💕', status: 'pending', postedAt: '2026-03-18T10:08:00', likes: 2, video: 'Minimalist Black & White Invite Process' },
  { id: '4', author: 'Emma Walsh', handle: '@emmawalsh_events', platform: 'Pinterest', content: 'Saving this for my sister\'s bridal shower planning! She\'s getting married in October and has been struggling to find the perfect invite style 🌸', sentiment: 'positive', sentimentScore: 0.91, isBuyingSignal: true, isFeatureRequest: false, isComplaint: false, aiReply: 'How exciting, congratulations to your sister! October is such a beautiful time for a wedding 🍂 Our Wildflower Rustic suite is absolutely perfect for an autumn wedding. I can also create a custom colour palette if she has specific colours in mind — just DM us!', status: 'approved', postedAt: '2026-03-17T19:44:00', likes: 24, video: '5 Templates Brides Are Obsessing Over' },
  { id: '5', author: 'Jess Morrison', handle: '@jessmorrison_bride', platform: 'Instagram', content: 'Do you offer matching table place cards and menus too? Would love a full suite!', sentiment: 'positive', sentimentScore: 0.88, isBuyingSignal: true, isFeatureRequest: true, isComplaint: false, aiReply: 'Great news Jess — yes! All our suites come with matching save the dates, menus, place cards, and seating chart templates. Check the full suite listing on our Etsy for the complete bundle. We also offer custom additions if you need anything specific 🤍', status: 'posted', postedAt: '2026-03-17T15:22:00', likes: 19, video: 'Behind the Design: Ivory & Gold Collection' },
  { id: '6', author: 'Natalie Park', handle: '@natalie.park.photo', platform: 'TikTok', content: 'The fonts you used are absolutely *chef\'s kiss* — so elegant. What font is that in the header?', sentiment: 'positive', sentimentScore: 0.94, isBuyingSignal: false, isFeatureRequest: false, isComplaint: false, aiReply: 'Thank you so much Natalie! The main heading font is Cormorant Garamond — it\'s actually a free Google Font, so you can use it in all your projects too! The body text is Jost. Both pair beautifully together for a luxury feel ✨', status: 'pending', postedAt: '2026-03-17T11:55:00', likes: 67, video: 'How I Design Wedding Invitations in 2025' },
  { id: '7', author: 'Chloe Bennett', handle: '@chloebennett2026', platform: 'Facebook', content: 'Why does the digital file not print in the right size? I ordered and printed and it came out wrong. Not happy.', sentiment: 'negative', sentimentScore: 0.08, isBuyingSignal: false, isFeatureRequest: false, isComplaint: true, aiReply: 'Chloe, I\'m really sorry about this — you deserved a perfect experience. Printing sizing can sometimes be tricky depending on the print service used. Please message me directly with the details and I\'ll provide a step-by-step guide for your specific printer, plus a pre-sized PDF file that\'s ready to print. I want to make this right for you 💗', status: 'pending', postedAt: '2026-03-16T17:30:00', likes: 0, video: 'Why Digital Invitations Are the Future' },
  { id: '8', author: 'Olivia Stone', handle: '@oliviastone_wedding', platform: 'TikTok', content: 'Purchased last week and OBSESSED. Literally all my bridesmaids are asking where I got my invites from!!', sentiment: 'positive', sentimentScore: 0.99, isBuyingSignal: false, isFeatureRequest: false, isComplaint: false, aiReply: 'This message made my whole week, Olivia!! 🥺💕 Wishing you the most beautiful wedding — please tag us in any photos, we\'d absolutely love to see your invitations in the wild! And maybe your bridesmaids would love a little discount code? 😉', status: 'posted', postedAt: '2026-03-15T09:12:00', likes: 112, video: 'Boho Garden Wedding Invite Reveal' },
]

const PLATFORMS = ['All', 'TikTok', 'Instagram', 'Facebook', 'Pinterest']
const SENTIMENTS = ['All', 'positive', 'neutral', 'negative']
const STATUSES = ['All', 'pending', 'approved', 'posted']
const SIGNALS = ['All signals', 'Buying signals', 'Feature requests', 'Complaints']

function SentimentIcon({ s }: { s: Sentiment }) {
  if (s === 'positive') return <ThumbsUp size={13} style={{ color: '#4A7C59' }} />
  if (s === 'negative') return <ThumbsDown size={13} style={{ color: '#B85C5C' }} />
  return <Minus size={13} style={{ color: '#C9A940' }} />
}

const platformColors: Record<string, { bg: string; text: string }> = {
  TikTok:    { bg: '#F0F0F0', text: '#1A1614' },
  Instagram: { bg: '#FFF0E8', text: '#C9956B' },
  Pinterest: { bg: '#F9EAEA', text: '#B85C5C' },
  Facebook:  { bg: '#EEF2FF', text: '#4B65C0' },
}

const sentimentStyle: Record<Sentiment, { bg: string; text: string; border: string; label: string }> = {
  positive: { bg: '#E8F5EE', text: '#4A7C59', border: '#C3DFD0', label: 'Positive' },
  neutral:  { bg: '#FBF5E0', text: '#C9A940', border: '#F0E4A8', label: 'Neutral' },
  negative: { bg: '#F9EAEA', text: '#B85C5C', border: '#F0CECE', label: 'Negative' },
}

export default function CommentsPage() {
  const [platformFilter, setPlatformFilter] = useState('All')
  const [sentimentFilter, setSentimentFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [signalFilter, setSignalFilter] = useState('All signals')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedReplies, setEditedReplies] = useState<Record<string, string>>({})
  const [localStatuses, setLocalStatuses] = useState<Record<string, CommentStatus>>({})

  const getStatus = (c: CommentItem): CommentStatus => localStatuses[c.id] ?? c.status
  const getReply  = (c: CommentItem): string => editedReplies[c.id] ?? c.aiReply

  const filtered = comments.filter(c => {
    if (platformFilter !== 'All' && c.platform !== platformFilter) return false
    if (sentimentFilter !== 'All' && c.sentiment !== sentimentFilter) return false
    if (statusFilter !== 'All' && getStatus(c) !== statusFilter) return false
    if (signalFilter === 'Buying signals' && !c.isBuyingSignal) return false
    if (signalFilter === 'Feature requests' && !c.isFeatureRequest) return false
    if (signalFilter === 'Complaints' && !c.isComplaint) return false
    return true
  })

  const stats = {
    positive: comments.filter(c => c.sentiment === 'positive').length,
    neutral:  comments.filter(c => c.sentiment === 'neutral').length,
    negative: comments.filter(c => c.sentiment === 'negative').length,
    buying:   comments.filter(c => c.isBuyingSignal).length,
    pending:  comments.filter(c => getStatus(c) === 'pending').length,
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FDFAF7' }}>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: '#9E918C' }}>Engagement</p>
          <h1 className="text-[32px] font-bold font-display tracking-tight" style={{ color: '#1A1614' }}>Comments & Sentiment</h1>
          <p className="text-[15px] mt-1" style={{ color: '#6B5F5A' }}>
            {comments.length} comments across all platforms · {stats.pending} awaiting reply
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold"
          style={{ background: 'linear-gradient(135deg, #1A1614, #2C2220)', color: '#C9A96E', border: '1px solid rgba(201,169,110,0.25)' }}>
          <Sparkles size={13} />
          {stats.pending} AI Replies Ready
        </div>
      </div>

      {/* Sentiment Overview */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 flex items-center gap-4" style={{ border: '1px solid #EDE8E4' }}>
          <div className="flex-1">
            <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: '#9E918C' }}>Sentiment Mix</p>
            <div className="flex items-end gap-2">
              <div className="h-8 rounded flex-1" style={{ backgroundColor: '#E8F5EE', position: 'relative' }}>
                <div className="h-full rounded" style={{ width: `${(stats.positive / comments.length) * 100}%`, background: '#4A7C59' }} />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2 text-[11px]">
              <span style={{ color: '#4A7C59' }}>● {stats.positive} pos</span>
              <span style={{ color: '#C9A940' }}>● {stats.neutral} neu</span>
              <span style={{ color: '#B85C5C' }}>● {stats.negative} neg</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #EDE8E4' }}>
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: '#9E918C' }}>Buying Signals</p>
          <p className="text-[32px] font-bold font-display" style={{ color: '#C9956B' }}>{stats.buying}</p>
          <p className="text-[12px]" style={{ color: '#9E918C' }}>high-intent comments</p>
        </div>
        <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #EDE8E4' }}>
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: '#9E918C' }}>Feature Requests</p>
          <p className="text-[32px] font-bold font-display" style={{ color: '#C9A96E' }}>{comments.filter(c => c.isFeatureRequest).length}</p>
          <p className="text-[12px]" style={{ color: '#9E918C' }}>product improvement ideas</p>
        </div>
        <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #EDE8E4' }}>
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: '#9E918C' }}>Awaiting Reply</p>
          <p className="text-[32px] font-bold font-display" style={{ color: '#B85C5C' }}>{stats.pending}</p>
          <p className="text-[12px]" style={{ color: '#9E918C' }}>AI drafts ready to approve</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl px-5 py-4 mb-4 flex items-center gap-3 flex-wrap" style={{ border: '1px solid #EDE8E4' }}>
        <Filter size={13} style={{ color: '#9E918C' }} />
        <div className="flex gap-1">
          {PLATFORMS.map(p => (
            <button key={p} onClick={() => setPlatformFilter(p)}
              className="px-3 py-1 rounded-full text-[12px] font-medium transition-all"
              style={platformFilter === p ? { background: '#1A1614', color: '#fff' } : { background: '#F5EFE8', color: '#6B5F5A' }}>
              {p}
            </button>
          ))}
        </div>
        <div className="w-px h-5" style={{ backgroundColor: '#EDE8E4' }} />
        <div className="flex gap-1">
          {SENTIMENTS.map(s => (
            <button key={s} onClick={() => setSentimentFilter(s)}
              className="px-3 py-1 rounded-full text-[12px] font-medium capitalize transition-all"
              style={sentimentFilter === s
                ? s === 'positive' ? { background: '#E8F5EE', color: '#4A7C59', border: '1px solid #C3DFD0' }
                  : s === 'negative' ? { background: '#F9EAEA', color: '#B85C5C', border: '1px solid #F0CECE' }
                  : s === 'neutral' ? { background: '#FBF5E0', color: '#C9A940', border: '1px solid #F0E4A8' }
                  : { background: '#F5EFE8', color: '#6B5F5A' }
                : { background: '#F5EFE8', color: '#6B5F5A' }
              }>
              {s}
            </button>
          ))}
        </div>
        <div className="w-px h-5" style={{ backgroundColor: '#EDE8E4' }} />
        <div className="flex gap-1">
          {SIGNALS.map(s => (
            <button key={s} onClick={() => setSignalFilter(s)}
              className="px-3 py-1 rounded-full text-[12px] font-medium transition-all"
              style={signalFilter === s ? { background: '#FFF0E8', color: '#C9956B', border: '1px solid #F0D9CC' } : { color: '#6B5F5A' }}>
              {s}
            </button>
          ))}
        </div>
        <div className="ml-auto text-[12px]" style={{ color: '#9E918C' }}>{filtered.length} comments</div>
      </div>

      {/* Comment feed */}
      <div className="space-y-3">
        {filtered.map(comment => {
          const ss = sentimentStyle[comment.sentiment]
          const pc = platformColors[comment.platform]
          const status = getStatus(comment)
          const reply = getReply(comment)
          const isEditing = editingId === comment.id

          return (
            <div key={comment.id} className="bg-white rounded-2xl overflow-hidden transition-all"
              style={{ border: `1px solid ${comment.sentiment === 'negative' ? '#F0CECE' : '#EDE8E4'}`, boxShadow: '0 1px 3px rgba(26,22,20,0.04)' }}>

              {/* Comment header */}
              <div className="px-5 py-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold"
                    style={{ background: 'linear-gradient(135deg, #F5E6E0, #F0D9CC)', color: '#C9956B' }}>
                    {comment.author[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[13px] font-semibold" style={{ color: '#1A1614' }}>{comment.author}</span>
                      <span className="text-[11px]" style={{ color: '#9E918C' }}>{comment.handle}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: pc.bg, color: pc.text }}>{comment.platform}</span>

                      {/* Signal badges */}
                      {comment.isBuyingSignal && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: '#FFF0E8', color: '#C9956B', border: '1px solid #F0D9CC' }}>
                          <ShoppingCart size={9} /> Buying Signal
                        </span>
                      )}
                      {comment.isFeatureRequest && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: '#FBF5E0', color: '#C9A940', border: '1px solid #F0E4A8' }}>
                          <Zap size={9} /> Feature Request
                        </span>
                      )}
                      {comment.isComplaint && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: '#F9EAEA', color: '#B85C5C', border: '1px solid #F0CECE' }}>
                          <AlertCircle size={9} /> Complaint
                        </span>
                      )}
                    </div>

                    <p className="text-[13.5px] leading-relaxed" style={{ color: '#1A1614' }}>{comment.content}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ backgroundColor: ss.bg, color: ss.text, border: `1px solid ${ss.border}` }}>
                        <SentimentIcon s={comment.sentiment} />
                        {ss.label}
                      </div>
                      <div className="flex items-center gap-1 text-[11px]" style={{ color: '#9E918C' }}>
                        <Heart size={10} /> {comment.likes}
                      </div>
                      <span className="text-[11px]" style={{ color: '#9E918C' }}>
                        on "{comment.video}" ·{' '}
                        {new Date(comment.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="flex-shrink-0">
                    {status === 'posted' ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: '#E8F5EE', color: '#4A7C59' }}>
                        <Check size={10} /> Posted
                      </span>
                    ) : status === 'approved' ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: '#FBF5E0', color: '#C9A940' }}>
                        <Check size={10} /> Approved
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: '#F5EFE8', color: '#9E918C' }}>
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Reply section */}
              {status !== 'posted' && (
                <div className="px-5 pb-4" style={{ borderTop: '1px solid #F5EFE8' }}>
                  <div className="mt-4 rounded-xl p-4" style={{ background: '#FDFAF7', border: '1px solid #EDE8E4' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={12} style={{ color: '#C9A96E' }} />
                      <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#9E918C' }}>AI Reply Draft</span>
                    </div>
                    {isEditing ? (
                      <textarea
                        value={reply}
                        onChange={e => setEditedReplies(prev => ({ ...prev, [comment.id]: e.target.value }))}
                        className="w-full text-[13px] leading-relaxed bg-white rounded-lg p-3 outline-none resize-none"
                        style={{ color: '#1A1614', border: '1px solid #EDE8E4', minHeight: '80px' }}
                        rows={3}
                      />
                    ) : (
                      <p className="text-[13px] leading-relaxed" style={{ color: '#6B5F5A' }}>{reply}</p>
                    )}

                    <div className="flex items-center gap-2 mt-3">
                      {isEditing ? (
                        <button onClick={() => setEditingId(null)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold"
                          style={{ background: '#E8F5EE', color: '#4A7C59' }}>
                          <Check size={11} /> Done
                        </button>
                      ) : (
                        <button onClick={() => setEditingId(comment.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors hover:opacity-80"
                          style={{ background: '#F5EFE8', color: '#6B5F5A' }}>
                          <Edit3 size={11} /> Edit
                        </button>
                      )}
                      {status === 'pending' && (
                        <button onClick={() => setLocalStatuses(prev => ({ ...prev, [comment.id]: 'approved' }))}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all hover:opacity-90"
                          style={{ background: '#FFF0E8', color: '#C9956B', border: '1px solid #F0D9CC' }}>
                          <ThumbsUp size={11} /> Approve
                        </button>
                      )}
                      <button onClick={() => setLocalStatuses(prev => ({ ...prev, [comment.id]: 'posted' }))}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all hover:opacity-90 ml-auto"
                        style={{ background: 'linear-gradient(135deg, #C9956B, #C9A96E)', color: '#fff', boxShadow: '0 2px 6px rgba(201,149,107,0.35)' }}>
                        <Send size={11} /> Post Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: '#9E918C' }}>
            <MessageCircle size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-[14px]">No comments match your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
