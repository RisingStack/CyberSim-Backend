const yup = require('yup');

const id = yup.string().required();
const singleRef = yup
  .string()
  .transform((array) => (Array.isArray(array) ? array[0] : array));
const multiRef = yup.array().of(yup.string());

const airtableSchemas = {
  handbook_categories: yup.object({
    id,
    name: yup.string(),
  }),
  locations: yup.object({
    id,
    name: yup.string(),
  }),
  recommendations: yup.object({
    id,
    name: yup.string(),
    handbook_category: singleRef,
  }),
  event_types: yup.object({
    id,
    name: yup.string(),
  }),
  events: yup.object({
    id,
    title: yup.string().required(),
    description: yup.string().required(),
    trigger_time: yup.number().integer().positive().required(),
    recommendations: singleRef,
    locations: singleRef,
    event_types: singleRef,
    role: singleRef,
    spreadsheet_id: yup.number().integer().positive(),
    poll_change: yup.number(),
    systems_to_disable: multiRef,
    response: multiRef,
    skipper_mitigation: singleRef,
    // skipper_mitigation_type: yup.string(),
    followup_event: singleRef,
  }),
  purchased_mitigations: yup.object({
    id,
    description: yup.string().required(),
    locations: multiRef.required(),
    cost: yup.number(),
    category: yup.string().required(),
  }),
  responses: yup.object({
    id,
    description: yup.string().required(),
    cost: yup.number(),
    locations: multiRef.required(),
    mitigation_location: multiRef,
    mitigation_id: singleRef,
    systems_to_restore: multiRef,
    required_mitigation: singleRef,
    required_mitigation_location: multiRef,
  }),
  systems: yup.object({
    id,
    name: yup.string().required(),
    description: yup.string(),
    locations: multiRef.required(),
  }),
  roles: yup.object({
    id,
    name: yup.string().required(),
  }),
  actions: yup.object({
    id,
    description: yup.string().required(),
    locations: singleRef.required(),
    cost: yup.number(),
    budget_increase: yup.number(),
    poll_increase: yup.number(),
    required_systems: multiRef,
    role: multiRef,
  }),
  curveballs: yup.object({
    id,
    description: yup.string().required(),
    poll_change: yup.number(),
    budget_change: yup.number(),
  }),
};

const locationsShort = ['hq', 'local'];
const locations = ['hq', 'local', 'party'];
const mitigationCategories = [
  'Operation',
  'National party voter database',
  'National party website',
  'Accounts',
  'Devices',
];
const injectionTypes = ['Table', 'Background', 'Board'];

const dbSchemas = {
  injection: yup.object({
    id,
    recommendations: yup.string(),
    title: yup.string().required(),
    description: yup.string().required(),
    trigger_time: yup.number().integer().required(),
    location: yup.string().oneOf(locationsShort),
    type: yup.string().oneOf(injectionTypes).required(),
    recipient_role: yup.string(),
    poll_change: yup.number().integer(),
    systems_to_disable: multiRef,
    skipper_mitigation: yup.string(),
    skipper_mitigation_type: yup.string().oneOf(locations),
    followup_injecion: yup.string(),
    asset_code: yup.string(),
  }),
  mitigation: yup.object({
    id,
    description: yup.string().required(),
    is_hq: yup.boolean().required(),
    is_local: yup.boolean().required(),
    hq_cost: yup.number(),
    local_cost: yup.number(),
    category: yup.string().oneOf(mitigationCategories).required(),
  }),
  response: yup.object({
    id,
    description: yup.string().required(),
    cost: yup.number(),
    location: yup.string().oneOf(locations).required(),
    mitigation_type: yup.string().oneOf(locations),
    mitigation_id: yup.string(),
    systems_to_restore: multiRef,
    required_mitigation: yup.string(),
    required_mitigation_type: yup.string().oneOf(locations),
  }),
  system: yup.object({
    id,
    name: yup.string().required(),
    description: yup.string(),
    type: yup.string().oneOf(locations).required(),
  }),
  role: yup.object({
    id,
    name: yup.string().required(),
  }),
  action: yup.object({
    id,
    description: yup.string().required(),
    type: yup.string().oneOf(locationsShort).required(),
    cost: yup.number(),
    budget_increase: yup.number(),
    poll_increase: yup.number(),
    required_systems: multiRef,
  }),
  curveball: yup.object({
    id,
    description: yup.string().required(),
    poll_change: yup.number(),
    budget_change: yup.number(),
    loose_all_budget: yup.number(),
  }),
  injection_response: yup.object({
    injection_id: yup.string().required(),
    response_id: yup.string().required(),
  }),
  action_role: yup.object({
    action_id: yup.string().required(),
    role_id: yup.string().required(),
  }),
};

module.exports = {
  airtableSchemas,
  dbSchemas,
};
