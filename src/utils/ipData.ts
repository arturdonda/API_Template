import IPData from 'ipdata';
import { IIpData } from '../models';

const ipdata = new IPData(process.env.IPDATA_KEY);

export const getIpInfo = (ipAddress: string): Promise<IIpData> =>
	ipdata.lookup(ipAddress).then(ipInfo => ({
		ip: ipInfo.ip ?? '',
		countryName: ipInfo.country_name ?? '',
		countryCode: ipInfo.country_code ?? '',
		countryFlag: ipInfo.emoji_flag ?? '',
		regionName: ipInfo.region ?? '',
		regionCode: ipInfo.region_code ?? '',
		city: ipInfo.city ?? '',
	}));

export const getIpInfoBulk = (ipAddressList: string[]): Promise<IIpData[]> =>
	ipdata.bulkLookup(ipAddressList).then(ipInfoList =>
		ipInfoList.map(ipInfo => ({
			ip: ipInfo.ip ?? '',
			countryName: ipInfo.country_name ?? '',
			countryCode: ipInfo.country_code ?? '',
			countryFlag: ipInfo.emoji_flag ?? '',
			regionName: ipInfo.region ?? '',
			regionCode: ipInfo.region_code ?? '',
			city: ipInfo.city ?? '',
		}))
	);
