import React from 'react'
import { useParams } from 'react-router-dom'
import UserLayout from '../layouts/user/Layout'
import { Skeleton, Result } from 'antd'
import useFetchData from '@/app/hooks/useFetchData'
import BlogDetail from '../components/shared/BlogDetail'
import { Blog } from '../data/blog'

const testBody = `
<p>In a world of back-to-back meetings, hellish commutes, and cramped workspaces, we have normalized serious issues like burnout, depression, and anxiety.</p>

<p>Our reasons? Productivity and hustle. But the irony&mdash;it&rsquo;s&nbsp;<em>precisely</em>&nbsp;by taking care of our minds that we become manifold effective and keep burnout at bay. To quote&nbsp;<a href="https://www.psychologytoday.com/us/blog/the-science-fandom/202109/why-leisure-is-never-waste-time#:~:text=The%20Benefits%20of%20Leisure&amp;text=There%20are%20both%20physical%20and,blood%20pressure%2C%20and%20heart%20rate." rel="noopener" target="_blank">Psychology Today</a>,</p>

<blockquote>&ldquo;There are both physical and psychological benefits of leisure time, with reduced levels of stress, anxiety, and depression; improved mood; and higher levels of positive emotion. They also lower cortisol levels, blood pressure, and heart rate.&rdquo;</blockquote>

<p>I want to share 5 such activities &mdash; but unlike the clich&eacute; ones, I won&rsquo;t tell you to meditate or stroll. I&rsquo;ll give you rarely-talked-about ones.</p>

<p>Sinking Into Your Chair and Relishing the Setting Sun</p>

<p>There&rsquo;s something soul-stirring about the orange sun receding into the horizon &mdash; the setting of the mighty&nbsp;<a href="https://www.space.com/17170-what-is-the-sun-made-of.html#:~:text=The%20sun%20is%20a%20big,system%20as%20heat%20and%20light." rel="noopener" target="_blank">burning gas ball</a>&nbsp;signals closure and reminds you to rest.</p>

<p>Add a lean-back chair into the mix and you&rsquo;ve got a treat. Whenever I shut my laptop and relish this, time screeches to a standstill &mdash; peace, calm, and the ever-present beauty of the&nbsp;<em>present</em>.</p>

<p>As my solar buddy disappears and I return to work, I brim with positivity, focus, and energy.</p>

<h2><strong>Don&rsquo;t worry if you don&rsquo;t have a sun view.</strong></h2>

<p>Star-gazing, admiring the shifting clouds, or even observing the barking mongrels, passing vehicles, and chirping birds will work. As time-management expert Selin Malkoc says,</p>

<blockquote>&ldquo;The key to enjoying your leisure activities is to live in the moment as much as possible.&rdquo;</blockquote>

<p>A Steamy Shower with A Scented Body Wash</p>

<p>May God bless the person who invented the showerhead &mdash; a hot shower is my omnipotent &ldquo;reset&rdquo; button.</p>

<p>Procrastinated for 2 hours? Lacking the motivation to write? Feeling lethargic? No matter what, post a hot shower, I&rsquo;m a&nbsp;<em>machine.</em></p>

<p>Hot showers have a&nbsp;<em>ton</em>&nbsp;of benefits &mdash; better sleep, healthier skin, reduced headaches, relieved bodily tension, and stress evaporation. With a scented body wash or oil, this climbs up another notch.</p>

<p>If you&rsquo;re looking for a jolt of mental energy and alertness rather than a calm mind recharge, go for a cold shower instead.</p>

<p>&nbsp;</p>

<p><img alt="Image" src="https://stablo-pro.web3templates.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75" style="height:493px; width:4096px" /></p>

<p>Photo by&nbsp;<a href="https://unsplash.com/@chewy?utm_source=medium&amp;utm_medium=referral" rel="noopener" target="_blank">Chewy</a>&nbsp;on&nbsp;<a href="https://unsplash.com/?utm_source=medium&amp;utm_medium=referral" rel="noopener" target="_blank">Unsplash</a></p>

<p>Banter with Your Family</p>

<p>It&rsquo;s been over a year since I stopped watching TV, streaming platforms, and anime. But now and then, I&rsquo;ll land on the sofa and bear through some TV just for the family time.</p>

<p><strong>Most often, the TV becomes a background noise</strong>&nbsp;&mdash; thanks to our chatter and laughter filling the living room. If it gets silent, I&rsquo;ll get back and even a small such interlude leaves me burning with energy.</p>

<blockquote>&ldquo;At the end of your life, you&rsquo;ll never regret not having passed one more test or not closing one more deal. You will regret time not spent with a husband, a friend, a child, a parent.&rdquo;<br />
<a href="https://www.brainyquote.com/quotes/barbara_bush_121743" rel="noopener" target="_blank">&mdash; Barbara Bush</a></blockquote>

<p>You don&rsquo;t even need full-blown family time &mdash; crossing over to your brother&rsquo;s room for 5 minutes, visiting your mom in the kitchen, or checking on your half-dozing half-reading grandma is enough.</p>

<p>A short positive circuit breaker is all you need.</p>

<h2>Reading Light Fiction</h2>

<p>Reading has become synonymous with non-fiction, mainly self-help. But fiction is as if not&nbsp;<em>more</em>&nbsp;beneficial.</p>

<p>While powerful characters and storylines with profound messages transform you from deep within, light-upbeat stories cure the darkest of moods and worries.</p>

<p>So much so that &ldquo;<em>Bibliotherapy</em>&rdquo; or reading therapy is actively used to reduce mental health issues.</p>

<p>My go-to is fantasy fiction &mdash; when you&rsquo;re teleported to surreal worlds, mundane earth&rsquo;s vagaries disappear. My top 4 picks would be The Emperor&rsquo;s Soul, The Final Empire, Assassin&rsquo;s Apprentice, and Lord Of The Rings.</p>

<blockquote>&ldquo;A reader lives a thousand lives before he dies. The man who never reads lives only one.&rdquo;<br />
&mdash;&nbsp;<a href="https://www.goodreads.com/quotes/408441-a-reader-lives-a-thousand-lives-before-he-dies-said" rel="noopener" target="_blank">George R.R Martin</a></blockquote>

<h2>Strumming Your Guitar</h2>

<p>Don&rsquo;t have one? Go for the keyboard. Classical much? The flute&rsquo;s waiting for you. Have a lot of space to spare? A piano won&rsquo;t complain.</p>

<p>Listening to music is widely recommended as a leisure activity, but playing music puts it to shame &mdash; deeper empathy, higher self-esteem, better memory, sharper focus, and protection against age-related brain degeneration.</p>

<p>One 6-month study whose subjects started learning the drums found white matter tract improvements&mdash;the brain parts that control the speed of neural transmission. Another linked long-term playing to significant positive neural changes. There are tons of other studies as well.</p>

<p>This is as much a reminder to brush the dust off my guitar as it is a piece of advice for you. Now that I&rsquo;m done with this article, let me go strum some strings.</p>

<blockquote>&ldquo;Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything.&rdquo;</blockquote>

`

const BlogPage: React.FC = () => {
  const { slug, id } = useParams()
  const [loading, error, response] = useFetchData(`/blog/${id}`)
  return (
    <UserLayout activeLink='blog'>
      <div className='!container !px-8 !mx-auto xl:!px-5  !max-w-screen-lg !py-5 lg:!py-8 !pt-0'>
        {error ? (
          <Result title='Failed to fetch' subTitle={error} status='error' />
        ) : (
          <Skeleton loading={loading} paragraph={{ rows: 10 }} active>
            <BlogDetail blog={response && (response as Blog)} />
          </Skeleton>
        )}
      </div>
    </UserLayout>
  )
}

export default BlogPage
