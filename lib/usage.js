import { getServiceSupabase } from './supabaseClient';
export async function reserveMonthlyUsage(estimatedCost) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.rpc('reserve_monthly_usage', { cost_to_add: estimatedCost });
    if (error)
        throw error;
    return Boolean(data);
}
