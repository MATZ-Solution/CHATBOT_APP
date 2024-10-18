import { GEN_AI, MODEL_NAME, GENERATION_CONFIG, SAFETY_SETTINGS } from './model';
import { COMPANY_INFO, CHATBOT_INFO_AND_FEATURES } from './knowledgeBank';
import { toTitleCase, normalizeState, templatize } from './helper';

const BACKEND_URI = 'https://chatbotserver.infosenior.care/api';

 const handleCompanyInfo = async (userPrompt: string, _params: any): Promise<string> => {
  const info = COMPANY_INFO.map((message) => ({ role: 'model', parts: [message] }));
  const model = GEN_AI.getGenerativeModel({ model: MODEL_NAME });
  const chat = model.startChat({
    history: info,
    GENERATION_CONFIG,
     SAFETY_SETTINGS,
  });

  const result = await chat.sendMessage(userPrompt);
  const response = await result.response;
  return response.text();
};

 const handleChatbotInfoAndFeatures = async (userPrompt: string, _params: any): Promise<string> => {
  const info = CHATBOT_INFO_AND_FEATURES.map((message) => ({ role: 'model', parts: [message] }));
  const model = GEN_AI.getGenerativeModel({ model: MODEL_NAME });
  const chat = model.startChat({
    history: info,
    generationConfig: GENERATION_CONFIG,
    safetySettings: SAFETY_SETTINGS,
  });

  const result = await chat.sendMessage(userPrompt);
  const response = await result.response;
  return response.text();
};

const handleFindFacilitiesByLocation = async (
  userPrompt: string,
  params: { state?: string; city?: string; zipCode?: string; category: string }
): Promise<string> => {
  let query = '';

  if (params.state) {
    query += `state=${normalizeState(params.state)}&`;
  }

  if (params.city) {
    query += `city=${toTitleCase(params.city)}&`;
  }

  if (params.zipCode) {
    query += `zipCode=${params.zipCode}`;
  }

  const request = `${BACKEND_URI}/${params.category}/fetch?${query}`;
  console.log(request,"request")
  const response = await fetch(request);
  console.log(response,"response")
  const json = await response.json();

  const html = `
    I fetched the top ${json.length} records matching your query.
    ${json.length > 0 ? 'Here is the information you requested:' : ''}
    <ul>
      ${json.map(templatize).join('\n')}
    </ul>
  `;
  return html;
};

// Update handleNearbyFacilities to return a Promise
 const handleNearbyFacilities = async (): Promise<string> => {
  return 'TO BE IMPLEMENTED: NEARBY FACILITY';
};

// Update handleSearchFacility to return a Promise
 const handleSearchFacility = async (userPrompt: string, params: any): Promise<string> => {
  return 'TO BE IMPLEMENTED: SEARCH FACILITY';
};

// Update handleMiscellaneous to return a Promise
export const handleMiscellaneous = async (): Promise<string> => {
  return "I'm sorry, I'm not equipped to handle that request at the moment. Is there anything else I can assist you with?";
};

// Define the type for intent handlers
type IntentHandler = (userPrompt: string, params?: any) => Promise<string>;

interface IntentHandles {
  [key: string]: IntentHandler;
}

export const INTENT_HANDLES: IntentHandles = {
  'company-info': handleCompanyInfo,
  'chatbot-info-and-features': handleChatbotInfoAndFeatures,
  'find-facilities-by-location': handleFindFacilitiesByLocation,
  'find-nearby-facilities': handleNearbyFacilities,
  'search-facility': handleSearchFacility,

};
