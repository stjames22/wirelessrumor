export type RumorRecord = {
  slug: string;
  claim: string;
  tag: string;
  verdict: string;
  score: number;
  trend: string;
  summary: string;
  evidenceFor: string[];
  evidenceAgainst: string[];
  watchFor: string[];
  statusHistory: { label: string; note: string }[];
};

export const rumors: RumorRecord[] = [
  {
    slug: 'ai-agents-replace-traditional-apps',
    claim: 'AI agents will replace traditional apps',
    tag: 'AGENTS',
    verdict: 'PLAUSIBLE',
    score: 72,
    trend: '↑ HOT',
    summary: 'Agents are increasingly able to complete multi-step tasks across services, but reliability, permissions and user trust still limit full app replacement.',
    evidenceFor: ['More software is exposing actions through APIs and agent tools.', 'AI assistants can already orchestrate tasks across multiple services.', 'Natural-language interfaces reduce the need to learn individual app workflows.'],
    evidenceAgainst: ['Many tasks still require deterministic interfaces and explicit user control.', 'Authentication, payments and regulated workflows remain difficult to delegate safely.', 'Users often prefer visual tools for complex editing and comparison.'],
    watchFor: ['Major operating systems exposing deeper agent permissions.', 'A mainstream agent completing purchases and bookings end-to-end reliably.', 'App stores shifting toward agent-callable services rather than standalone interfaces.'],
    statusHistory: [{ label: 'RUMOR', note: 'Broad prediction entered the radar.' }, { label: 'DEVELOPING', note: 'Agent tooling and OS integrations strengthened the case.' }]
  },
  {
    slug: 'ai-wearable-next-personal-computer',
    claim: 'The next personal computer will be an AI wearable',
    tag: 'DEVICES',
    verdict: 'DEVELOPING',
    score: 61,
    trend: '↑',
    summary: 'Wearables may absorb some phone tasks, but displays, batteries and input constraints still make a complete replacement uncertain.',
    evidenceFor: ['Always-on voice and vision models are a natural fit for wearable hardware.', 'Several companies are experimenting with glasses, pins and ear-worn AI devices.'],
    evidenceAgainst: ['Early AI wearables have struggled with battery life, latency and usefulness.', 'Phones remain difficult to replace for rich visual interaction.'],
    watchFor: ['All-day battery life with useful multimodal AI.', 'A major platform vendor shipping AI-first glasses at consumer scale.'],
    statusHistory: [{ label: 'RUMOR', note: 'Tracked as a recurring post-smartphone prediction.' }]
  },
  {
    slug: 'ai-run-small-company',
    claim: 'AI can already run a small company with minimal human help',
    tag: 'BUSINESS',
    verdict: 'MOSTLY TRUE',
    score: 84,
    trend: '↑↑',
    summary: 'AI can handle substantial portions of research, marketing, support and operations, but humans still carry legal responsibility and handle exceptions.',
    evidenceFor: ['AI tools can generate sites, campaigns, support replies and operational documents.', 'Agent workflows can connect multiple business systems and automate routine work.'],
    evidenceAgainst: ['Banking, contracts, identity verification and liability still require accountable humans.', 'Long-running autonomous workflows remain error-prone.'],
    watchFor: ['Businesses reporting sustained revenue with very low human intervention.', 'Financial and legal services enabling tightly scoped machine agents.'],
    statusHistory: [{ label: 'RUMOR', note: 'Initially tracked as a provocative AI-business claim.' }, { label: 'MOSTLY TRUE', note: 'Evidence increasingly supports narrow autonomous operations.' }]
  },
  {
    slug: 'agi-secretly-operating',
    claim: 'AGI is secretly operating inside major AI labs',
    tag: 'AGI',
    verdict: 'UNPROVEN',
    score: 23,
    trend: '→',
    summary: 'There is no strong public evidence that a generally capable autonomous system meeting a rigorous AGI definition is secretly operating inside a lab.',
    evidenceFor: ['Frontier labs routinely test systems more capable than public releases.'],
    evidenceAgainst: ['Extraordinary claims lack independently verifiable evidence.', 'Current systems still show major reliability and autonomy limitations.'],
    watchFor: ['Credible independent documentation.', 'Reproducible demonstrations of broad autonomous competence.'],
    statusHistory: [{ label: 'RUMOR', note: 'Added due to repeated online speculation.' }, { label: 'UNPROVEN', note: 'No corroborating evidence strong enough to raise confidence.' }]
  },
  {
    slug: 'humanoid-robots-common-this-decade',
    claim: 'Humanoid robots will become common household products this decade',
    tag: 'ROBOTICS',
    verdict: 'POSSIBLE',
    score: 58,
    trend: '↑',
    summary: 'Rapid progress in manipulation and embodied AI makes household robots more plausible, but cost, safety and reliability remain significant barriers.',
    evidenceFor: ['Robotics companies are improving dexterity and learned manipulation quickly.', 'Foundation models are transferring language and vision capabilities into physical tasks.'],
    evidenceAgainst: ['Homes are highly variable and unforgiving environments.', 'Hardware maintenance and safety certification can slow adoption.'],
    watchFor: ['Sub-$20,000 general-purpose robots with dependable home-task performance.', 'Large-scale consumer pilots from major manufacturers.'],
    statusHistory: [{ label: 'RUMOR', note: 'Long-running robotics prediction entered the radar.' }, { label: 'POSSIBLE', note: 'Recent embodied-AI progress increased confidence.' }]
  }
];

export function getRumor(slug: string) {
  return rumors.find((rumor) => rumor.slug === slug);
}
