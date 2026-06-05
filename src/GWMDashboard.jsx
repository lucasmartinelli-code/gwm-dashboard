import { useState, useMemo, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, ComposedChart, Line, CartesianGrid, LabelList } from "recharts";
import { RAW_BP, BP_UPDATED } from "./GWMBoletoPixData";

const RAW = [
  { id:"161854336401", payerId:"1775431239", collectorId:"3166103110", date:"05/06/2026 12:43", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161837122437", payerId:"1940138973", collectorId:"3166103110", date:"05/06/2026 11:20", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162631893894", payerId:"1789326023", collectorId:"3166103110", date:"05/06/2026 11:12", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162630323784", payerId:"1772926668", collectorId:"3166103110", date:"05/06/2026 11:02", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161831204297", payerId:"1525565243", collectorId:"3166103110", date:"05/06/2026 10:43", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161823898213", payerId:"1639326231", collectorId:"3166103110", date:"05/06/2026 09:56", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161821964669", payerId:"1532204759", collectorId:"3166103110", date:"05/06/2026 09:49", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161816289967", payerId:"1528161270", collectorId:"3166103110", date:"05/06/2026 09:25", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162617550344", payerId:"1599262963", collectorId:"3166103110", date:"05/06/2026 09:20", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162617260464", payerId:"1522883583", collectorId:"3166103110", date:"05/06/2026 09:19", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161815122057", payerId:"1707799318", collectorId:"3166103110", date:"05/06/2026 09:18", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162613677034", payerId:"1637658452", collectorId:"3166103110", date:"05/06/2026 08:59", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161814134369", payerId:"1789412054", collectorId:"3166103110", date:"05/06/2026 08:45", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162612816356", payerId:"1581083862", collectorId:"3166103110", date:"05/06/2026 08:37", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162609434070", payerId:"1581083862", collectorId:"3166103110", date:"05/06/2026 08:36", status:"rejected", detail:"cc_rejected_bad_filled_date", amount:350, method:"visa", op:"regular_payment" },
  { id:"162601826452", payerId:"1453849672", collectorId:"3166103110", date:"05/06/2026 06:43", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161789902623", payerId:"1553768003", collectorId:"3166103110", date:"05/06/2026 01:14", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161783617605", payerId:"1432828768", collectorId:"3166103110", date:"04/06/2026 23:54", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162577889404", payerId:"3170792492", collectorId:"3166103110", date:"04/06/2026 23:06", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161773398565", payerId:"1622477761", collectorId:"3166103110", date:"04/06/2026 21:52", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161754865943", payerId:"1911048956", collectorId:"3166103110", date:"04/06/2026 20:03", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162550842548", payerId:"2122345309", collectorId:"3166103110", date:"04/06/2026 19:35", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162548295666", payerId:"2122345309", collectorId:"3166103110", date:"04/06/2026 19:33", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"visa", op:"regular_payment" },
  { id:"162548938854", payerId:"1537284398", collectorId:"3166103110", date:"04/06/2026 19:28", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161740333029", payerId:"1568038156", collectorId:"3166103110", date:"04/06/2026 18:28", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162532134874", payerId:"1909242051", collectorId:"3166103110", date:"04/06/2026 17:51", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161730075137", payerId:"1605537117", collectorId:"3166103110", date:"04/06/2026 17:27", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161724969607", payerId:"2026468684", collectorId:"3166103110", date:"04/06/2026 16:59", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162518561852", payerId:"1339939893", collectorId:"3166103110", date:"04/06/2026 16:30", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162519397260", payerId:"1807798853", collectorId:"3166103110", date:"04/06/2026 16:30", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162519313176", payerId:"1339939893", collectorId:"3166103110", date:"04/06/2026 16:28", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:56, method:"master", op:"regular_payment" },
  { id:"162519397014", payerId:"1339939893", collectorId:"3166103110", date:"04/06/2026 16:26", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:56, method:"master", op:"regular_payment" },
  { id:"162518193624", payerId:"1339939893", collectorId:"3166103110", date:"04/06/2026 16:25", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:56, method:"master", op:"regular_payment" },
  { id:"161718135921", payerId:"2412051989", collectorId:"3166103110", date:"04/06/2026 16:13", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161718307671", payerId:"2412051989", collectorId:"3166103110", date:"04/06/2026 16:10", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:35, method:"master", op:"regular_payment" },
  { id:"161719388797", payerId:"2412051989", collectorId:"3166103110", date:"04/06/2026 16:09", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"master", op:"regular_payment" },
  { id:"161716698061", payerId:"1578675173", collectorId:"3166103110", date:"04/06/2026 16:03", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162512659964", payerId:"1623077771", collectorId:"3166103110", date:"04/06/2026 15:47", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162511200088", payerId:"1657522491", collectorId:"3166103110", date:"04/06/2026 15:39", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162511347400", payerId:"1548723731", collectorId:"3166103110", date:"04/06/2026 15:31", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161711746007", payerId:"1645493733", collectorId:"3166103110", date:"04/06/2026 15:25", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162512420168", payerId:"1997670660", collectorId:"3166103110", date:"04/06/2026 15:24", status:"rejected", detail:"cc_rejected_high_risk", amount:56, method:"master", op:"regular_payment" },
  { id:"162507801428", payerId:"1239124758", collectorId:"3166103110", date:"04/06/2026 15:04", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161698422765", payerId:"1555482201", collectorId:"3166103110", date:"04/06/2026 13:35", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162495198768", payerId:"1445717801", collectorId:"3166103110", date:"04/06/2026 13:28", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162493181434", payerId:"1170197711", collectorId:"3166103110", date:"04/06/2026 13:22", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161692027197", payerId:"1662277641", collectorId:"3166103110", date:"04/06/2026 13:00", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161692396635", payerId:"2247554347", collectorId:"3166103110", date:"04/06/2026 12:57", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162486605572", payerId:"1646389532", collectorId:"3166103110", date:"04/06/2026 12:46", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162485421708", payerId:"1642025843", collectorId:"3166103110", date:"04/06/2026 12:42", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161684495733", payerId:"1649261222", collectorId:"3166103110", date:"04/06/2026 12:27", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161683387133", payerId:"1762430666", collectorId:"3166103110", date:"04/06/2026 12:14", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161675356349", payerId:"1532913437", collectorId:"3166103110", date:"04/06/2026 11:18", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162470640232", payerId:"1534549929", collectorId:"3166103110", date:"04/06/2026 11:01", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161668829843", payerId:"1564622244", collectorId:"3166103110", date:"04/06/2026 10:54", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161668487575", payerId:"1561913850", collectorId:"3166103110", date:"04/06/2026 10:47", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161669022633", payerId:"1790219400", collectorId:"3166103110", date:"04/06/2026 10:41", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162463224518", payerId:"1732825471", collectorId:"3166103110", date:"04/06/2026 10:16", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162463032510", payerId:"1507411628", collectorId:"3166103110", date:"04/06/2026 10:15", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161662367879", payerId:"1644055510", collectorId:"3166103110", date:"04/06/2026 10:07", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161662740701", payerId:"2096541682", collectorId:"3166103110", date:"04/06/2026 09:57", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161656353057", payerId:"1540031354", collectorId:"3166103110", date:"04/06/2026 09:08", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162450979032", payerId:"1702468967", collectorId:"3166103110", date:"04/06/2026 08:39", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162450934806", payerId:"1702468967", collectorId:"3166103110", date:"04/06/2026 08:35", status:"rejected", detail:"cc_rejected_insufficient_amount", amount:350, method:"visa", op:"regular_payment" },
  { id:"162450978110", payerId:"1724348011", collectorId:"3166103110", date:"04/06/2026 08:24", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161650685311", payerId:"1655279261", collectorId:"3166103110", date:"04/06/2026 08:08", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161649911927", payerId:"1796650109", collectorId:"3166103110", date:"04/06/2026 08:07", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161650674881", payerId:"1724007774", collectorId:"3166103110", date:"04/06/2026 08:01", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161645504041", payerId:"1606967658", collectorId:"3166103110", date:"04/06/2026 07:09", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161645328725", payerId:"1672590617", collectorId:"3166103110", date:"04/06/2026 06:34", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162439169380", payerId:"1737995451", collectorId:"3166103110", date:"04/06/2026 06:00", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162439140290", payerId:"3448567311", collectorId:"3166103110", date:"04/06/2026 05:12", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162427745634", payerId:"1531174633", collectorId:"3166103110", date:"04/06/2026 00:47", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162420105198", payerId:"1834895674", collectorId:"3166103110", date:"03/06/2026 23:07", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162418513960", payerId:"1562242185", collectorId:"3166103110", date:"03/06/2026 22:56", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161618012141", payerId:"1635239700", collectorId:"3166103110", date:"03/06/2026 22:07", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"161616323739", payerId:"1449667342", collectorId:"3166103110", date:"03/06/2026 22:06", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162414756206", payerId:"1657600952", collectorId:"3166103110", date:"03/06/2026 22:05", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161610073233", payerId:"1555289190", collectorId:"3166103110", date:"03/06/2026 21:19", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162404583242", payerId:"1793683180", collectorId:"3166103110", date:"03/06/2026 21:01", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161597729861", payerId:"3449651764", collectorId:"3166103110", date:"03/06/2026 20:06", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161598271247", payerId:"1546782767", collectorId:"3166103110", date:"03/06/2026 20:03", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161583779729", payerId:"1536068103", collectorId:"3166103110", date:"03/06/2026 18:43", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161583731287", payerId:"1536068103", collectorId:"3166103110", date:"03/06/2026 18:39", status:"rejected", detail:"cc_rejected_other_reason", amount:56, method:"visa", op:"regular_payment" },
  { id:"162379856898", payerId:"1787156685", collectorId:"3166103110", date:"03/06/2026 18:31", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161581759551", payerId:"1631780011", collectorId:"3166103110", date:"03/06/2026 18:30", status:"approved", detail:"accredited", amount:20, method:"master", op:"regular_payment" },
  { id:"161565607093", payerId:"1655043324", collectorId:"3166103110", date:"03/06/2026 16:53", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161557441287", payerId:"1546779548", collectorId:"3166103110", date:"03/06/2026 16:01", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"161556411267", payerId:"1785126378", collectorId:"3166103110", date:"03/06/2026 15:53", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162353926590", payerId:"1819731278", collectorId:"3166103110", date:"03/06/2026 15:50", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161556410675", payerId:"1819731278", collectorId:"3166103110", date:"03/06/2026 15:47", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"visa", op:"regular_payment" },
  { id:"162351223652", payerId:"3449043818", collectorId:"3166103110", date:"03/06/2026 15:43", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161553642703", payerId:"1135067068", collectorId:"3166103110", date:"03/06/2026 15:29", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161550024989", payerId:"2933800366", collectorId:"3166103110", date:"03/06/2026 15:07", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161548854973", payerId:"1515491621", collectorId:"3166103110", date:"03/06/2026 14:58", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161548866511", payerId:"1627852362", collectorId:"3166103110", date:"03/06/2026 14:55", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161547251339", payerId:"1614616537", collectorId:"3166103110", date:"03/06/2026 14:53", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162342743096", payerId:"2993039965", collectorId:"3166103110", date:"03/06/2026 14:42", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162334526812", payerId:"1625344444", collectorId:"3166103110", date:"03/06/2026 13:46", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161527647907", payerId:"1432828768", collectorId:"3166103110", date:"03/06/2026 12:59", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:350, method:"amex", op:"regular_payment" },
  { id:"162319946608", payerId:"1616084251", collectorId:"3166103110", date:"03/06/2026 12:23", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162313178220", payerId:"1648087924", collectorId:"3166103110", date:"03/06/2026 11:42", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162309479940", payerId:"3448468284", collectorId:"3166103110", date:"03/06/2026 11:39", status:"approved", detail:"accredited", amount:56, method:"elo", op:"regular_payment" },
  { id:"162304876956", payerId:"1608743050", collectorId:"3166103110", date:"03/06/2026 11:01", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161506737181", payerId:"1751680767", collectorId:"3166103110", date:"03/06/2026 10:54", status:"approved", detail:"accredited", amount:56, method:"elo", op:"regular_payment" },
  { id:"161504737601", payerId:"2139794350", collectorId:"3166103110", date:"03/06/2026 10:46", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162293459838", payerId:"1402401829", collectorId:"3166103110", date:"03/06/2026 09:58", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161499520385", payerId:"1553702943", collectorId:"3166103110", date:"03/06/2026 09:56", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162293270740", payerId:"2056169128", collectorId:"3166103110", date:"03/06/2026 09:39", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162292251168", payerId:"1471117376", collectorId:"3166103110", date:"03/06/2026 09:39", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162293270360", payerId:"1418620789", collectorId:"3166103110", date:"03/06/2026 09:33", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161491856909", payerId:"1588790893", collectorId:"3166103110", date:"03/06/2026 09:05", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162284731750", payerId:"1785035640", collectorId:"3166103110", date:"03/06/2026 08:52", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161477341777", payerId:"1380183432", collectorId:"3166103110", date:"03/06/2026 06:53", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162271073894", payerId:"1629290966", collectorId:"3166103110", date:"03/06/2026 06:31", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161471030401", payerId:"1604151454", collectorId:"3166103110", date:"03/06/2026 02:21", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162265385094", payerId:"1926551159", collectorId:"3166103110", date:"03/06/2026 01:47", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"162255456004", payerId:"1555033868", collectorId:"3166103110", date:"02/06/2026 23:18", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161459369665", payerId:"1432915840", collectorId:"3166103110", date:"02/06/2026 23:11", status:"rejected", detail:"cc_rejected_insufficient_amount", amount:35, method:"master", op:"regular_payment" },
  { id:"162256330380", payerId:"1804646330", collectorId:"3166103110", date:"02/06/2026 23:04", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"161458741431", payerId:"1716195753", collectorId:"3166103110", date:"02/06/2026 22:57", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161457060299", payerId:"1455878758", collectorId:"3166103110", date:"02/06/2026 22:29", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162245860786", payerId:"1584320689", collectorId:"3166103110", date:"02/06/2026 21:32", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161442323995", payerId:"3447088624", collectorId:"3166103110", date:"02/06/2026 20:51", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162232159458", payerId:"1645677579", collectorId:"3166103110", date:"02/06/2026 20:04", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161433445329", payerId:"2941444797", collectorId:"3166103110", date:"02/06/2026 19:47", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161427247049", payerId:"1630552299", collectorId:"3166103110", date:"02/06/2026 19:09", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161425725627", payerId:"1630552299", collectorId:"3166103110", date:"02/06/2026 19:05", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:56, method:"master", op:"regular_payment" },
  { id:"161406461405", payerId:"1556285311", collectorId:"3166103110", date:"02/06/2026 17:13", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162203938272", payerId:"2109984031", collectorId:"3166103110", date:"02/06/2026 17:11", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162193659874", payerId:"1771711611", collectorId:"3166103110", date:"02/06/2026 16:17", status:"rejected", detail:"cc_rejected_insufficient_amount", amount:56, method:"master", op:"regular_payment" },
  { id:"162187156834", payerId:"1702161508", collectorId:"3166103110", date:"02/06/2026 15:19", status:"rejected", detail:"cc_rejected_insufficient_amount", amount:56, method:"master", op:"regular_payment" },
  { id:"161389843655", payerId:"1771711611", collectorId:"3166103110", date:"02/06/2026 15:16", status:"rejected", detail:"cc_rejected_insufficient_amount", amount:56, method:"master", op:"regular_payment" },
  { id:"162182246532", payerId:"3444221025", collectorId:"3166103110", date:"02/06/2026 14:39", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162175217202", payerId:"1608926580", collectorId:"3166103110", date:"02/06/2026 13:55", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161377981503", payerId:"1609436249", collectorId:"3166103110", date:"02/06/2026 13:48", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161378634659", payerId:"1559600815", collectorId:"3166103110", date:"02/06/2026 13:44", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161377632905", payerId:"1380398521", collectorId:"3166103110", date:"02/06/2026 13:40", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162171522646", payerId:"1615542429", collectorId:"3166103110", date:"02/06/2026 13:25", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161373076097", payerId:"1763046719", collectorId:"3166103110", date:"02/06/2026 13:18", status:"approved", detail:"accredited", amount:350, method:"elo", op:"regular_payment" },
  { id:"162167654172", payerId:"1760636274", collectorId:"3166103110", date:"02/06/2026 12:58", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161348611061", payerId:"1561505878", collectorId:"3166103110", date:"02/06/2026 10:54", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161344719849", payerId:"1549960294", collectorId:"3166103110", date:"02/06/2026 10:36", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161344721413", payerId:"1977150720", collectorId:"3166103110", date:"02/06/2026 10:31", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161338717873", payerId:"1523678748", collectorId:"3166103110", date:"02/06/2026 09:51", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162131038962", payerId:"1792686514", collectorId:"3166103110", date:"02/06/2026 09:18", status:"approved", detail:"accredited", amount:35, method:"visa", op:"recurring_payment" },
  { id:"162119300168", payerId:"1528262745", collectorId:"3166103110", date:"02/06/2026 07:02", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161300412497", payerId:"1789650546", collectorId:"3166103110", date:"02/06/2026 01:53", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162088449742", payerId:"1664178548", collectorId:"3166103110", date:"02/06/2026 01:34", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161290425027", payerId:"1162665655", collectorId:"3166103110", date:"02/06/2026 00:49", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162077762718", payerId:"1535219731", collectorId:"3166103110", date:"01/06/2026 23:05", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162077391222", payerId:"1663204214", collectorId:"3166103110", date:"01/06/2026 23:05", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161274867785", payerId:"1450555992", collectorId:"3166103110", date:"01/06/2026 21:44", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161270706447", payerId:"1507732671", collectorId:"3166103110", date:"01/06/2026 21:07", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162054476408", payerId:"1594076550", collectorId:"3166103110", date:"01/06/2026 20:01", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161257114785", payerId:"3402652602", collectorId:"3166103110", date:"01/06/2026 19:45", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162047856186", payerId:"1579636129", collectorId:"3166103110", date:"01/06/2026 19:21", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161251812515", payerId:"1775960742", collectorId:"3166103110", date:"01/06/2026 19:12", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161250746363", payerId:"3316699910", collectorId:"3166103110", date:"01/06/2026 19:05", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161234474717", payerId:"1604854490", collectorId:"3166103110", date:"01/06/2026 17:39", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161233858381", payerId:"3441846727", collectorId:"3166103110", date:"01/06/2026 17:32", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162024348628", payerId:"1756702787", collectorId:"3166103110", date:"01/06/2026 17:16", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162018266920", payerId:"1564899314", collectorId:"3166103110", date:"01/06/2026 16:40", status:"approved", detail:"accredited", amount:35, method:"visa", op:"recurring_payment" },
  { id:"162017376400", payerId:"1227629732", collectorId:"3166103110", date:"01/06/2026 16:29", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162012121878", payerId:"1777551471", collectorId:"3166103110", date:"01/06/2026 16:08", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:350, method:"master", op:"regular_payment" },
  { id:"162012035710", payerId:"1777551471", collectorId:"3166103110", date:"01/06/2026 16:06", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:350, method:"master", op:"regular_payment" },
  { id:"162011933850", payerId:"1758485016", collectorId:"3166103110", date:"01/06/2026 16:05", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:350, method:"master", op:"regular_payment" },
  { id:"162012367128", payerId:"1758485016", collectorId:"3166103110", date:"01/06/2026 16:02", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:350, method:"master", op:"regular_payment" },
  { id:"162006545786", payerId:"1921888277", collectorId:"3166103110", date:"01/06/2026 15:30", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162006369530", payerId:"1355061567", collectorId:"3166103110", date:"01/06/2026 15:27", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162006067226", payerId:"1988516311", collectorId:"3166103110", date:"01/06/2026 15:22", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161999485840", payerId:"2364142705", collectorId:"3166103110", date:"01/06/2026 14:45", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161999131924", payerId:"1618360334", collectorId:"3166103110", date:"01/06/2026 14:44", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161203325827", payerId:"1735291438", collectorId:"3166103110", date:"01/06/2026 14:29", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161203239507", payerId:"1513256565", collectorId:"3166103110", date:"01/06/2026 14:26", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161992663276", payerId:"1750528806", collectorId:"3166103110", date:"01/06/2026 13:58", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161986307514", payerId:"1581214845", collectorId:"3166103110", date:"01/06/2026 13:21", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161189859275", payerId:"1499913649", collectorId:"3166103110", date:"01/06/2026 13:04", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161188916465", payerId:"1624621609", collectorId:"3166103110", date:"01/06/2026 12:53", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161180925023", payerId:"1903793787", collectorId:"3166103110", date:"01/06/2026 12:17", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161971369430", payerId:"1739921799", collectorId:"3166103110", date:"01/06/2026 12:05", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161970735268", payerId:"1991843426", collectorId:"3166103110", date:"01/06/2026 11:59", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161174281623", payerId:"1544016473", collectorId:"3166103110", date:"01/06/2026 11:46", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161965804974", payerId:"3442713222", collectorId:"3166103110", date:"01/06/2026 11:27", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161166916803", payerId:"1751090925", collectorId:"3166103110", date:"01/06/2026 10:51", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161957509798", payerId:"1535800004", collectorId:"3166103110", date:"01/06/2026 10:43", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161161584049", payerId:"1781123011", collectorId:"3166103110", date:"01/06/2026 10:29", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161155733305", payerId:"1527509448", collectorId:"3166103110", date:"01/06/2026 09:41", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161945326244", payerId:"1635896940", collectorId:"3166103110", date:"01/06/2026 08:59", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161150608883", payerId:"1852972992", collectorId:"3166103110", date:"01/06/2026 08:54", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161148768173", payerId:"1541795321", collectorId:"3166103110", date:"01/06/2026 08:25", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161939105676", payerId:"3331946432", collectorId:"3166103110", date:"01/06/2026 08:20", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161939261178", payerId:"1800382000", collectorId:"3166103110", date:"01/06/2026 08:13", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161939036394", payerId:"1732638362", collectorId:"3166103110", date:"01/06/2026 07:57", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"161142641905", payerId:"1537404110", collectorId:"3166103110", date:"01/06/2026 07:50", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161929373644", payerId:"1352319295", collectorId:"3166103110", date:"01/06/2026 06:54", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161929405632", payerId:"1806283198", collectorId:"3166103110", date:"01/06/2026 06:52", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161929210668", payerId:"1605755195", collectorId:"3166103110", date:"01/06/2026 06:18", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161906962110", payerId:"1627439835", collectorId:"3166103110", date:"31/05/2026 21:59", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161105934409", payerId:"1517816628", collectorId:"3166103110", date:"31/05/2026 20:49", status:"approved", detail:"accredited", amount:35, method:"amex", op:"regular_payment" },
  { id:"161885065288", payerId:"1262304914", collectorId:"3166103110", date:"31/05/2026 19:15", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161093550445", payerId:"1262304914", collectorId:"3166103110", date:"31/05/2026 19:10", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:35, method:"master", op:"regular_payment" },
  { id:"161087305855", payerId:"1670427382", collectorId:"3166103110", date:"31/05/2026 18:38", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161879095776", payerId:"1975630304", collectorId:"3166103110", date:"31/05/2026 18:31", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161087070423", payerId:"1750670449", collectorId:"3166103110", date:"31/05/2026 18:17", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161084829335", payerId:"1585859399", collectorId:"3166103110", date:"31/05/2026 18:09", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161875551616", payerId:"1525035690", collectorId:"3166103110", date:"31/05/2026 17:59", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161082783939", payerId:"2982736685", collectorId:"3166103110", date:"31/05/2026 17:59", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161876662576", payerId:"1381077895", collectorId:"3166103110", date:"31/05/2026 17:56", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"161869262510", payerId:"1854369340", collectorId:"3166103110", date:"31/05/2026 16:47", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161075910649", payerId:"1754264311", collectorId:"3166103110", date:"31/05/2026 16:39", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161074410793", payerId:"1727961727", collectorId:"3166103110", date:"31/05/2026 16:27", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161865146404", payerId:"1571148574", collectorId:"3166103110", date:"31/05/2026 16:06", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"161865146134", payerId:"1270748725", collectorId:"3166103110", date:"31/05/2026 16:03", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161862550120", payerId:"1477355132", collectorId:"3166103110", date:"31/05/2026 15:38", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161065963751", payerId:"1511306861", collectorId:"3166103110", date:"31/05/2026 15:21", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161859576246", payerId:"1546090225", collectorId:"3166103110", date:"31/05/2026 15:12", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161064337029", payerId:"1543376128", collectorId:"3166103110", date:"31/05/2026 14:55", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161063407363", payerId:"1562242185", collectorId:"3166103110", date:"31/05/2026 14:51", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161855222736", payerId:"1891971707", collectorId:"3166103110", date:"31/05/2026 14:39", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161853824348", payerId:"1517554854", collectorId:"3166103110", date:"31/05/2026 14:21", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161851068826", payerId:"1737326437", collectorId:"3166103110", date:"31/05/2026 14:04", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161055894087", payerId:"1543415116", collectorId:"3166103110", date:"31/05/2026 13:57", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161057424879", payerId:"1543415116", collectorId:"3166103110", date:"31/05/2026 13:54", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:56, method:"visa", op:"regular_payment" },
  { id:"161051133047", payerId:"1704312915", collectorId:"3166103110", date:"31/05/2026 13:09", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161841375702", payerId:"1735076697", collectorId:"3166103110", date:"31/05/2026 13:02", status:"approved", detail:"accredited", amount:20, method:"visa", op:"regular_payment" },
  { id:"161831963106", payerId:"2244649595", collectorId:"3166103110", date:"31/05/2026 11:44", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161038238791", payerId:"3438508931", collectorId:"3166103110", date:"31/05/2026 11:27", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161829378742", payerId:"1830931230", collectorId:"3166103110", date:"31/05/2026 11:20", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161033525909", payerId:"1551525005", collectorId:"3166103110", date:"31/05/2026 10:59", status:"approved", detail:"accredited", amount:35, method:"visa", op:"recurring_payment" },
  { id:"161029478299", payerId:"2935305091", collectorId:"3166103110", date:"31/05/2026 09:57", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161029100187", payerId:"1501192849", collectorId:"3166103110", date:"31/05/2026 09:51", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161026002795", payerId:"1615158081", collectorId:"3166103110", date:"31/05/2026 09:12", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161025092881", payerId:"1548005659", collectorId:"3166103110", date:"31/05/2026 08:58", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161816641300", payerId:"1691430533", collectorId:"3166103110", date:"31/05/2026 08:56", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161022279519", payerId:"1430901906", collectorId:"3166103110", date:"31/05/2026 08:04", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161813451370", payerId:"1700099546", collectorId:"3166103110", date:"31/05/2026 07:37", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161022102385", payerId:"1406192075", collectorId:"3166103110", date:"31/05/2026 07:30", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161812840504", payerId:"1664691788", collectorId:"3166103110", date:"31/05/2026 06:47", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161015164485", payerId:"1234826236", collectorId:"3166103110", date:"31/05/2026 02:34", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161797481376", payerId:"1659170758", collectorId:"3166103110", date:"31/05/2026 00:09", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161795803416", payerId:"1683242772", collectorId:"3166103110", date:"30/05/2026 23:51", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"160999947619", payerId:"2042433862", collectorId:"3166103110", date:"30/05/2026 23:07", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160996953561", payerId:"2095950464", collectorId:"3166103110", date:"30/05/2026 22:32", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161787458860", payerId:"1650314483", collectorId:"3166103110", date:"30/05/2026 22:14", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161786001062", payerId:"3016003355", collectorId:"3166103110", date:"30/05/2026 22:03", status:"approved", detail:"accredited", amount:35, method:"visa", op:"recurring_payment" },
  { id:"161783039382", payerId:"1614049957", collectorId:"3166103110", date:"30/05/2026 21:45", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"160988779429", payerId:"2334448863", collectorId:"3166103110", date:"30/05/2026 21:32", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160986175611", payerId:"1738260219", collectorId:"3166103110", date:"30/05/2026 21:18", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160984913737", payerId:"1499891112", collectorId:"3166103110", date:"30/05/2026 21:09", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160981575229", payerId:"1614116017", collectorId:"3166103110", date:"30/05/2026 20:42", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160980053087", payerId:"1861396679", collectorId:"3166103110", date:"30/05/2026 20:32", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161768186050", payerId:"1612089041", collectorId:"3166103110", date:"30/05/2026 20:19", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161768411280", payerId:"1620846219", collectorId:"3166103110", date:"30/05/2026 20:13", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"160974510331", payerId:"1500666128", collectorId:"3166103110", date:"30/05/2026 19:49", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160968386189", payerId:"1665670153", collectorId:"3166103110", date:"30/05/2026 19:11", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160965334175", payerId:"1792729123", collectorId:"3166103110", date:"30/05/2026 18:54", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160964268303", payerId:"1792729123", collectorId:"3166103110", date:"30/05/2026 18:49", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"master", op:"regular_payment" },
  { id:"161754992582", payerId:"1939877339", collectorId:"3166103110", date:"30/05/2026 18:47", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"160960491923", payerId:"1629092283", collectorId:"3166103110", date:"30/05/2026 18:42", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161749566044", payerId:"1769108028", collectorId:"3166103110", date:"30/05/2026 18:28", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"161750254592", payerId:"1621312971", collectorId:"3166103110", date:"30/05/2026 18:19", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160953692581", payerId:"1149761293", collectorId:"3166103110", date:"30/05/2026 17:49", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"160948026835", payerId:"1691021848", collectorId:"3166103110", date:"30/05/2026 17:15", status:"rejected", detail:"cc_rejected_bad_filled_date", amount:56, method:"visa", op:"regular_payment" },
  { id:"161731517330", payerId:"1897117840", collectorId:"3166103110", date:"30/05/2026 16:25", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160935630691", payerId:"1639326231", collectorId:"3166103110", date:"30/05/2026 15:49", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161724179662", payerId:"2049846083", collectorId:"3166103110", date:"30/05/2026 15:37", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161719977044", payerId:"1248688578", collectorId:"3166103110", date:"30/05/2026 15:00", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"160923384483", payerId:"1290164544", collectorId:"3166103110", date:"30/05/2026 14:21", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161713007566", payerId:"1623055543", collectorId:"3166103110", date:"30/05/2026 14:20", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161714016866", payerId:"1632768563", collectorId:"3166103110", date:"30/05/2026 14:18", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161707076706", payerId:"1502361536", collectorId:"3166103110", date:"30/05/2026 13:32", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160908746553", payerId:"1745290321", collectorId:"3166103110", date:"30/05/2026 12:54", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160900549877", payerId:"1716170183", collectorId:"3166103110", date:"30/05/2026 12:25", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160901586645", payerId:"1600947103", collectorId:"3166103110", date:"30/05/2026 12:18", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"160901550543", payerId:"1607654405", collectorId:"3166103110", date:"30/05/2026 12:16", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161690601268", payerId:"1617924808", collectorId:"3166103110", date:"30/05/2026 12:08", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161689479532", payerId:"1776041044", collectorId:"3166103110", date:"30/05/2026 12:05", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"160893549333", payerId:"2562290513", collectorId:"3166103110", date:"30/05/2026 11:42", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161679228028", payerId:"1747461923", collectorId:"3166103110", date:"30/05/2026 11:10", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161681366696", payerId:"1799533563", collectorId:"3166103110", date:"30/05/2026 11:10", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"160886988059", payerId:"1747461923", collectorId:"3166103110", date:"30/05/2026 11:07", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"160887844489", payerId:"1629859068", collectorId:"3166103110", date:"30/05/2026 10:54", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"160887706311", payerId:"1629859068", collectorId:"3166103110", date:"30/05/2026 10:50", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"visa", op:"regular_payment" },
  { id:"160884779699", payerId:"1598575435", collectorId:"3166103110", date:"30/05/2026 10:46", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160885654631", payerId:"1532421679", collectorId:"3166103110", date:"30/05/2026 10:41", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161673923270", payerId:"1642610937", collectorId:"3166103110", date:"30/05/2026 10:22", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160878823727", payerId:"1872835050", collectorId:"3166103110", date:"30/05/2026 09:59", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161669075366", payerId:"1586499980", collectorId:"3166103110", date:"30/05/2026 09:45", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161668993214", payerId:"1586499980", collectorId:"3166103110", date:"30/05/2026 09:41", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"master", op:"regular_payment" },
  { id:"160878468251", payerId:"1601759201", collectorId:"3166103110", date:"30/05/2026 09:35", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160875856655", payerId:"1579347591", collectorId:"3166103110", date:"30/05/2026 09:14", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160870079889", payerId:"1202692431", collectorId:"3166103110", date:"30/05/2026 08:11", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161658252876", payerId:"1755147802", collectorId:"3166103110", date:"30/05/2026 06:19", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160866976829", payerId:"1328350528", collectorId:"3166103110", date:"30/05/2026 06:11", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160866968531", payerId:"1535192921", collectorId:"3166103110", date:"30/05/2026 06:01", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160865001061", payerId:"3438032386", collectorId:"3166103110", date:"30/05/2026 05:01", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161648544126", payerId:"1748265493", collectorId:"3166103110", date:"30/05/2026 01:07", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" }
];

const COLLECTOR_ID = "3166103110";
const LAST_UPDATED = "05/06/2026 13:12";
const LAST_TRX     = RAW.length > 0 ? RAW[0].date : "-";
const METHOD_COLORS = { master:"#3b82f6", visa:"#a855f7", amex:"#10b981" };
const STATUS_COLORS = { approved:"#22c55e", rejected:"#ef4444", refunded:"#f59e0b" };
const REJ_COLORS = {
  cc_rejected_high_risk:                "#ef4444",
  cc_rejected_bad_filled_card_number:   "#f87171",
  cc_rejected_bad_filled_date:          "#fca5a5",
  cc_rejected_bad_filled_security_code: "#fb923c",
  cc_rejected_call_for_authorize:       "#f59e0b",
  cc_rejected_insufficient_amount:      "#fbbf24",
};
const REJ_SHORT = {
  cc_rejected_high_risk:                "High Risk",
  cc_rejected_bad_filled_card_number:   "Nº Cartão",
  cc_rejected_bad_filled_date:          "Data",
  cc_rejected_bad_filled_security_code: "CVV",
  cc_rejected_call_for_authorize:       "Call Auth",
  cc_rejected_insufficient_amount:      "Fundos",
};
const REJ_LABEL = {
  cc_rejected_high_risk:                "High Risk (PF)",
  cc_rejected_bad_filled_card_number:   "Nº Cartão inválido",
  cc_rejected_bad_filled_date:          "Data inválida",
  cc_rejected_bad_filled_security_code: "CVV inválido",
  cc_rejected_call_for_authorize:       "Call for Auth (banco)",
  cc_rejected_insufficient_amount:      "Fundos insuficientes",
};

function parseDate(str) {
  const [d, t] = str.split(" ");
  const [day, mon, year] = d.split("/");
  return new Date(`${year}-${mon}-${day}T${t}:00`);
}
function pct(a, b) { return b === 0 ? 0 : Math.round((a / b) * 1000) / 10; }
function brl(v)    { return `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`; }

// Dia mais recente da base
const LATEST_DATE = RAW.reduce((max, r) => {
  const ts = parseDate(r.date).getTime();
  return ts > max.ts ? { d: r.date.split(" ")[0], ts } : max;
}, { d: "", ts: 0 }).d;

// user_try_last: janela 24h rolante
function applyUserTryLast(rows) {
  const sorted = [...rows].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  const kept = new Set();
  const groups = {};
  sorted.forEach(r => {
    const ts  = parseDate(r.date).getTime();
    const key = `${r.payerId}|${COLLECTOR_ID}|${r.amount}`;
    if (!(key in groups)) {
      groups[key] = ts;
      kept.add(r.id);
    } else {
      const diff = groups[key] - ts;
      if (diff > 24 * 60 * 60 * 1000) {
        groups[key] = ts;
        kept.add(r.id);
      }
    }
  });
  return rows.filter(r => kept.has(r.id));
}

// Filtro de período
function applyPeriod(rows, period) {
  if (period === "hoje") return rows.filter(r => r.date.startsWith(LATEST_DATE.split("/").join("/")));
  if (period === "24h") {
    const maxTs = Math.max(...rows.map(r => parseDate(r.date).getTime()));
    return rows.filter(r => maxTs - parseDate(r.date).getTime() <= 24 * 60 * 60 * 1000);
  }
  return rows; // total
}

const Tip = ({ active, payload, label, metric }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:7, padding:"9px 13px", fontSize:11, minWidth:150 }}>
      <div style={{ color:"#64748b", marginBottom:5, fontSize:10 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || p.stroke || "#e2e8f0", marginBottom:2 }}>
          {p.name}: {p.name === "Aprovação" ? `${p.value}%` : metric === "brl" ? brl(p.value) : p.value}
        </div>
      ))}
    </div>
  );
};

// ── BOLETO & PIX ──────────────────────────────────────────────────────────
let bpAnimDone = false; // persiste entre remontagens — animação roda só 1 vez
const BP_DETAILS = ["expired","rejected_high_risk","pending_waiting_payment","pending_waiting_transfer","refunded"];
const BP_COLORS  = { expired:"#ef4444", rejected_high_risk:"#7c3aed", pending_waiting_payment:"#f59e0b", pending_waiting_transfer:"#fb923c", refunded:"#3b82f6" };
const BP_MONTHS  = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

function fmtBig(v) {
  if (v >= 1e9) return `R$ ${(v/1e9).toFixed(2)}B`;
  if (v >= 1e6) return `R$ ${(v/1e6).toFixed(1)}M`;
  if (v >= 1e3) return `R$ ${(v/1e3).toFixed(0)}K`;
  return `R$ ${v.toFixed(0)}`;
}

const BPTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const items = payload.filter(p => (p.value || 0) > 0.05).sort((a,b) => b.value - a.value);
  return (
    <div style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:7, padding:"10px 14px", fontSize:11, minWidth:200 }}>
      <div style={{ color:"#64748b", marginBottom:6, fontSize:10 }}>{label}</div>
      {items.map((p,i) => (
        <div key={i} style={{ color: p.fill || p.stroke || "#e2e8f0", marginBottom:2 }}>
          {p.name}: {p.value?.toFixed(1)}%
        </div>
      ))}
    </div>
  );
};

function BoletoPixTab({ bpPeriod, bpSeller, bpMetodo, bpMetric }) {
  const maxDate = useMemo(() => RAW_BP.reduce((mx,r) => r.f > mx ? r.f : mx, ""), []);

  const baseRows = useMemo(() => {
    let rows = RAW_BP;
    if (bpSeller !== "all") rows = rows.filter(r => r.s === bpSeller);
    if (bpMetodo !== "all") rows = rows.filter(r => r.m === bpMetodo);
    return rows;
  }, [bpSeller, bpMetodo]);

  const periodRows = useMemo(() => {
    if (bpPeriod === "30d") {
      const dt = new Date(maxDate+"T12:00:00");
      dt.setDate(dt.getDate()-29);
      const cut = dt.toISOString().slice(0,10);
      return baseRows.filter(r => r.f >= cut);
    }
    return baseRows.filter(r => r.f >= maxDate.slice(0,7)+"-01");
  }, [baseRows, bpPeriod, maxDate]);

  const kpis = useMemo(() => {
    let tQ=0,tB=0,aQ=0,aB=0,eQ=0,eB=0,pQ=0,pB=0,rQ=0,rB=0;
    periodRows.forEach(r => {
      tQ+=r.q; tB+=r.b;
      if (r.si==="approved"||r.si==="refunded") { aQ+=r.q; aB+=r.b; }
      else if (r.si==="cancelled") { eQ+=r.q; eB+=r.b; }
      else if (r.si==="pending")   { pQ+=r.q; pB+=r.b; }
      else if (r.si==="rejected")  { rQ+=r.q; rB+=r.b; }
    });
    const isBrl = bpMetric === "brl";
    const rate  = isBrl ? (tB>0?aB/tB*100:0) : (tQ>0?aQ/tQ*100:0);
    return {
      tot:  isBrl ? fmtBig(tB)  : tQ.toLocaleString("pt-BR"),
      tpv:  isBrl ? fmtBig(aB)  : aQ.toLocaleString("pt-BR"),
      exp:  isBrl ? fmtBig(eB)  : eQ.toLocaleString("pt-BR"),
      pend: isBrl ? fmtBig(pB)  : pQ.toLocaleString("pt-BR"),
      risk: isBrl ? fmtBig(rB)  : rQ.toLocaleString("pt-BR"),
      asp: `R$ ${Math.round(tQ>0?tB/tQ:0).toLocaleString("pt-BR")}`,
      rate: rate.toFixed(1),
      sc:   rate>=75 ? "#22c55e" : rate>=50 ? "#f59e0b" : "#ef4444",
      lbl:  rate>=75 ? "NORMAL"  : rate>=50 ? "ALERTA"  : "CRÍTICO",
    };
  }, [periodRows, bpMetric]);

  const chartData = useMemo(() => {
    const map = {};
    periodRows.forEach(r => {
      if (!map[r.f]) map[r.f] = { _tQ:0,_tB:0,_aQ:0,_aB:0 };
      map[r.f]._tQ+=r.q; map[r.f]._tB+=r.b;
      if (r.si==="approved"||r.si==="refunded") { map[r.f]._aQ+=r.q; map[r.f]._aB+=r.b; }
      map[r.f]["q_"+r.d] = (map[r.f]["q_"+r.d]||0)+r.q;
      map[r.f]["b_"+r.d] = (map[r.f]["b_"+r.d]||0)+r.b;
    });
    return Object.keys(map).sort().map(k => {
      const d = map[k];
      const tot = bpMetric==="brl" ? d._tB : d._tQ;
      const ap  = bpMetric==="brl" ? d._aB : d._aQ;
      const row = {
        label: k.slice(5).replace("-","/"),
        aproPct: tot>0 ? parseFloat((ap/tot*100).toFixed(1)) : null,
        _raw_aproPct: ap,
        _tot: tot,
      };
      BP_DETAILS.forEach(x => {
        const v = bpMetric==="brl" ? (d["b_"+x]||0) : (d["q_"+x]||0);
        row[x] = tot>0 ? parseFloat((v/tot*100).toFixed(1)) : 0;
        row[`_raw_${x}`] = v;
      });
      return row;
    });
  }, [periodRows, bpMetric]);

  // ── Animação da linha (carrinho) ──────────────────────────────────────
  const [animVis, setAnimVis] = useState(bpAnimDone ? 1 : 0);
  const [carOn,   setCarOn]   = useState(false);
  const rafRef = useRef(null);
  const t0Ref  = useRef(null);
  const ANIM_DURATION = 2200;

  useEffect(() => {
    if (bpAnimDone) return; // só anima uma vez — na primeira abertura da aba
    t0Ref.current = null;
    setCarOn(true);
    function step(now) {
      if (!t0Ref.current) t0Ref.current = now;
      const p = Math.min((now - t0Ref.current) / ANIM_DURATION, 1);
      setAnimVis(p);
      if (p < 1) { rafRef.current = requestAnimationFrame(step); }
      else        { bpAnimDone = true; setCarOn(false); }
    }
    const tid = setTimeout(() => { rafRef.current = requestAnimationFrame(step); }, 100);
    return () => { clearTimeout(tid); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []); // [] = só na montagem inicial

  const visibleChartData = useMemo(() => {
    const n = chartData.length;
    const vis = Math.ceil(animVis * n);
    return chartData.map((d, i) => ({ ...d, aproPct: i < vis ? d.aproPct : null }));
  }, [chartData, animVis]);

  const subtitle = useMemo(() => {
    const [y,mo,d] = maxDate.split("-");
    const maxStr = `${d}/${mo}/${y}`;
    if (bpPeriod === "30d") {
      const dt = new Date(maxDate+"T12:00:00"); dt.setDate(dt.getDate()-29);
      const [,cm,cd] = dt.toISOString().slice(0,10).split("-");
      return `${cd}/${cm} → ${maxStr}`;
    }
    return `01/${mo} → ${maxStr}`;
  }, [bpPeriod, maxDate]);

  const kpiCard = (label, val, sub, col) => (
    <div className="card" style={{ padding:"12px 14px" }}>
      <div style={{ fontSize:8, color:"#475569", letterSpacing:".12em", marginBottom:6 }}>{label}</div>
      <div style={{ fontSize:18, fontWeight:700, color:col, letterSpacing:".02em" }}>{val}</div>
      {sub && <div style={{ fontSize:8, color:col, marginTop:3, opacity:.8 }}>{sub}</div>}
    </div>
  );

  return (
    <div>
      {/* Info período */}
      <div style={{ fontSize:9, color:"#334155", letterSpacing:".1em", marginBottom:14 }}>
        MLB · {subtitle} · ATZ: {BP_UPDATED}
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:10, marginBottom:14 }}>
        {kpiCard("TOTAL EMITIDO",    kpis.tot,  null,            "#e2e8f0")}
        {kpiCard("% APROVAÇÃO",      kpis.rate+"%", kpis.lbl,   "#ffffff")}
        {kpiCard(bpMetric==="brl" ? "TPV APROVADO" : "TPN APROVADO", kpis.tpv, "accredited", "#22c55e")}
        {kpiCard("EXPIRADOS",        kpis.exp,  "expired",      "#ef4444")}
        {kpiCard("PENDENTES",        kpis.pend, "pending_*",    "#f59e0b")}
        {kpiCard("HIGH RISK (PF)",   kpis.risk, "rejected",     "#7c3aed")}
        {kpiCard("ASP · TICKET MÉD", kpis.asp, "brl / trx",    "#38bdf8")}
      </div>

      {/* Gráfico */}
      <div className="card" style={{ padding:"14px 6px 10px 4px" }}>
        <div style={{ fontSize:9, color:"#475569", letterSpacing:".1em", marginLeft:12, marginBottom:10 }}>
          BARRAS = % NÃO APROVADO (expired · pending · rejected) · LINHA BRANCA = % APROVAÇÃO
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={visibleChartData} margin={{ top:24, right:16, left:4, bottom:4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize:9, fill:"#475569", fontFamily:"IBM Plex Mono" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0,100]} tick={{ fontSize:9, fill:"#475569", fontFamily:"IBM Plex Mono" }} tickFormatter={v=>`${v}%`} axisLine={false} tickLine={false} width={36} />
            <Tooltip content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const pt  = payload[0]?.payload;
              const isBrl = bpMetric === "brl";
              const fmt = v => isBrl ? fmtBig(v||0) : (v||0).toLocaleString("pt-BR") + " trx";
              const items = payload.filter(p => (p.value||0) > 0.05).sort((a,b) => b.value - a.value);
              return (
                <div style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:7, padding:"10px 14px", fontSize:11, minWidth:220 }}>
                  <div style={{ color:"#64748b", marginBottom:6, fontSize:10 }}>
                    {pt?.label} · Total: {fmt(pt?._tot)}
                  </div>
                  {items.map((p, i) => {
                    const raw = p.dataKey === "aproPct" ? pt?._raw_aproPct : pt?.[`_raw_${p.dataKey}`];
                    return (
                      <div key={i} style={{ color: p.fill || p.stroke || "#e2e8f0", marginBottom:2, display:"flex", justifyContent:"space-between", gap:16 }}>
                        <span>{p.dataKey}</span>
                        <span style={{ color:"#e2e8f0" }}>{p.value?.toFixed(1)}% · {fmt(raw)}</span>
                      </div>
                    );
                  })}
                </div>
              );
            }} />
            {BP_DETAILS.map(x => (
              <Bar key={x} dataKey={x} stackId="a" fill={BP_COLORS[x]} isAnimationActive={false} maxBarSize={36} />
            ))}
            <Line type="monotone" dataKey="aproPct" stroke="#ffffff" strokeWidth={2} isAnimationActive={false} connectNulls={false}
              dot={(props) => {
                const { cx, cy, index, value } = props;
                if (value == null) return <g key={index} />;
                // durante animação: mostra carrinho na ponta, sem dots nos outros pontos
                if (carOn) {
                  const lastIdx = visibleChartData.reduce((last, d, i) => d.aproPct != null ? i : last, -1);
                  if (index === lastIdx) {
                    return (
                      <g key={index} transform={`translate(${cx + 20}, ${cy - 20}) scale(-1, 1)`}>
                        <text fontSize="32" textAnchor="middle" dominantBaseline="middle">🚗</text>
                      </g>
                    );
                  }
                  return <g key={index} />;
                }
                // animação concluída: dots brancos normais
                return <circle key={index} cx={cx} cy={cy} r={3} fill="#ffffff" stroke="none" />;
              }}>
              <LabelList dataKey="aproPct" position="top" style={{ fill:"#ffffff", fontSize:11, fontWeight:"bold", fontFamily:"IBM Plex Mono" }} formatter={v => v != null ? `${Math.round(v)}%` : ""} />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
        {/* Legenda */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"6px 20px", marginTop:10, marginLeft:14, fontSize:9, color:"#64748b", letterSpacing:".05em" }}>
          {BP_DETAILS.map(x => (
            <span key={x} style={{ display:"flex", alignItems:"center", gap:5 }}>
              <span style={{ width:10, height:10, borderRadius:2, background:BP_COLORS[x], display:"inline-block" }} />
              {x}
            </span>
          ))}
          <span style={{ display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ width:18, height:2, background:"#ffffff", display:"inline-block" }} />
            % Aprovação
          </span>
        </div>
      </div>
    </div>
  );
}

export default function GWMDashboard() {
  const [metric,  setMetric]  = useState("qty");
  const [tryLast, setTryLast] = useState(false);
  const [period,  setPeriod]  = useState("24h"); // "total" | "24h" | "hoje"
  const [tab,     setTab]     = useState("boletopix");
  // Estado da aba Boleto & Pix (no header quando tab === "boletopix")
  const [bpPeriod, setBpPeriod] = useState("30d");
  const [bpSeller, setBpSeller] = useState("all");
  const [bpMetodo, setBpMetodo] = useState("bolbradesco");
  const [bpMetric, setBpMetric] = useState("brl");

  // Pipeline: período → user_try_last
  const data = useMemo(() => {
    let d = applyPeriod(RAW, period);
    if (tryLast) d = applyUserTryLast(d);
    return d;
  }, [period, tryLast]);

  const removedCount = useMemo(() => {
    const base = applyPeriod(RAW, period);
    return base.length - applyUserTryLast(base).length;
  }, [period]);

  // ── KPIs ──
  const total       = data.length;
  const volTotal    = data.reduce((s, r) => s + r.amount, 0);
  const approved    = data.filter(r => r.status === "approved");
  const rejected    = data.filter(r => r.status === "rejected");
  const volApproved = approved.reduce((s, r) => s + r.amount, 0);
  const volRejected = rejected.reduce((s, r) => s + r.amount, 0);
  const aproQty     = pct(approved.length, total);
  const aproBrl     = pct(volApproved, volTotal);
  const aproVal     = metric === "qty" ? aproQty : aproBrl;
  const statusColor = aproVal >= 75 ? "#22c55e" : aproVal >= 50 ? "#f59e0b" : "#ef4444";
  const statusLabel = aproVal >= 75 ? "NORMAL"  : aproVal >= 50 ? "ALERTA"  : "CRÍTICO";

  // ── Rejeições ──
  const rejMap = {};
  rejected.forEach(r => {
    if (!rejMap[r.detail]) rejMap[r.detail] = { qty:0, brl:0 };
    rejMap[r.detail].qty++;
    rejMap[r.detail].brl += r.amount;
  });
  const rejData = Object.entries(rejMap)
    .sort((a, b) => b[1][metric] - a[1][metric])
    .map(([code, v]) => ({
      code, label: REJ_LABEL[code]||code, short: REJ_SHORT[code]||code,
      qty: v.qty, brl: v.brl,
      shareQty: pct(v.qty, total), shareBrl: pct(v.brl, volTotal),
    }));

  // ── Bandeiras ──
  const methodMap = {};
  data.forEach(r => {
    if (!methodMap[r.method]) methodMap[r.method] = { qty:0, brl:0 };
    methodMap[r.method].qty++;
    methodMap[r.method].brl += r.amount;
  });
  const methodData = Object.entries(methodMap)
    .map(([name, v]) => ({
      name, qty: v.qty, brl: v.brl,
      share: pct(metric === "qty" ? v.qty : v.brl, metric === "qty" ? total : volTotal),
    }))
    .sort((a, b) => b[metric] - a[metric]);

  // ── Pie ──
  const pieData = [
    { name:"Aprovadas",  value: metric==="qty" ? approved.length : volApproved, color:"#22c55e" },
    { name:"Rejeitadas", value: metric==="qty" ? rejected.length : volRejected, color:"#ef4444" },
  ].filter(d => d.value > 0);

  // ── Timeline: por hora (hoje/24h) ou por dia (total) ──
  const timelineByHour = period !== "total";
  const allRejCodes = [...new Set(rejected.map(r => r.detail))];

  const timelineMap = {};
  data.forEach(r => {
    const [datePart, timePart] = r.date.split(" ");
    const hour = timePart.split(":")[0] + "h";
    // 24h: chave inclui data para evitar colisão entre mesma hora em dias diferentes
    const key = timelineByHour
      ? (period === "24h" ? datePart.slice(0, 5) + " " + hour : hour)
      : datePart;
    if (!timelineMap[key]) timelineMap[key] = { key, _sortTs: parseDate(r.date).getTime(), apro_qty:0, rej_qty:0, apro_brl:0, rej_brl:0, tot_qty:0, tot_brl:0 };
    timelineMap[key].tot_qty++;
    timelineMap[key].tot_brl += r.amount;
    if (r.status === "approved") { timelineMap[key].apro_qty++; timelineMap[key].apro_brl += r.amount; }
    if (r.status === "rejected") { timelineMap[key].rej_qty++;  timelineMap[key].rej_brl  += r.amount; }
  });

  const hourData = Object.values(timelineMap)
    .sort((a, b) => a._sortTs - b._sortTs)
    .map(h => ({
      label: h.key,
      Aprovadas:  metric === "qty" ? h.apro_qty : h.apro_brl,
      Rejeitadas: metric === "qty" ? h.rej_qty  : h.rej_brl,
      apro_pct: pct(metric === "qty" ? h.apro_qty : h.apro_brl, metric === "qty" ? h.tot_qty : h.tot_brl),
    }));

  // Recusas empilhadas + linha
  const hourRejMap = {};
  data.forEach(r => {
    const [datePart, timePart] = r.date.split(" ");
    const hour = timePart.split(":")[0] + "h";
    const key = timelineByHour
      ? (period === "24h" ? datePart.slice(0, 5) + " " + hour : hour)
      : datePart;
    if (!hourRejMap[key]) hourRejMap[key] = { key, _sortTs: parseDate(r.date).getTime(), _tot_qty:0, _apro_qty:0, _tot_brl:0, _apro_brl:0 };
    hourRejMap[key]._tot_qty++;
    hourRejMap[key]._tot_brl += r.amount;
    if (r.status === "approved") { hourRejMap[key]._apro_qty++; hourRejMap[key]._apro_brl += r.amount; }
    if (r.status === "rejected") {
      hourRejMap[key][r.detail+"_qty"] = (hourRejMap[key][r.detail+"_qty"]||0) + 1;
      hourRejMap[key][r.detail+"_brl"] = (hourRejMap[key][r.detail+"_brl"]||0) + r.amount;
    }
  });
  const hourRejData = Object.values(hourRejMap)
    .sort((a, b) => a._sortTs - b._sortTs)
    .map(h => {
      const tot  = metric === "qty" ? h._tot_qty  : h._tot_brl;
      const apro = metric === "qty" ? h._apro_qty : h._apro_brl;
      const row  = { label: h.key, "Aprovação": pct(apro, tot) };
      allRejCodes.forEach(code => {
        row[REJ_SHORT[code]||code] = h[code+"_"+(metric==="brl"?"brl":"qty")]||0;
      });
      return row;
    });

  const periodLabel = period === "total" ? "TOTAL" : period === "hoje" ? `HOJE (${LATEST_DATE})` : "ÚLTIMAS 24H";

  return (
    <div style={{ background:"#070b12", minHeight:"100vh", fontFamily:"'IBM Plex Mono','Courier New',monospace", color:"#e2e8f0", padding:"20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; }
        .card { background:#0f172a; border:1px solid #1e293b; border-radius:8px; }
        .fade { animation:fd .3s ease; }
        @keyframes fd { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }
        .tbtn { background:none; border:none; cursor:pointer; font-family:inherit; font-size:11px; letter-spacing:.1em; padding:6px 14px; border-radius:5px; transition:all .15s; }
        .mbtn { border:none; cursor:pointer; font-family:inherit; font-size:11px; font-weight:700; letter-spacing:.08em; padding:6px 14px; border-radius:5px; transition:all .2s; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18, borderBottom:"1px solid #1e293b", paddingBottom:14, flexWrap:"wrap", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:6, background:"linear-gradient(135deg,#1d4ed8,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>G</div>
          <div>
            <div style={{ fontSize:15, fontWeight:700, color:"#f1f5f9", letterSpacing:".06em" }}>GWM · DASHBOARD ANALÍTICO</div>
            <div style={{ fontSize:9, color:"#334155", letterSpacing:".12em" }}>SELLER 3166103110 · 1305036763 · MLB · {periodLabel}</div>
            <div style={{ display:"flex", gap:8, marginTop:5, flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"center", gap:4, background:"#0a1a0a", border:"1px solid #14532d", borderRadius:4, padding:"2px 7px" }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e", display:"inline-block" }} />
                <span style={{ fontSize:8, color:"#86efac", letterSpacing:".1em" }}>ÚLTIMA TRX: {LAST_TRX}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4, background:"#0a0f1a", border:"1px solid #1e3a5f", borderRadius:4, padding:"2px 7px" }}>
                <span style={{ fontSize:9, lineHeight:1 }}>&#x21bb;</span>
                <span style={{ fontSize:8, color:"#93c5fd", letterSpacing:".1em" }}>ATUALIZADO: {LAST_UPDATED}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>

          {/* ── Filtros cartão (tabs 1-3) ── */}
          {tab !== "boletopix" && <>
            <div style={{ display:"flex", background:"#0f172a", border:"1px solid #1e293b", borderRadius:7, padding:3 }}>
              {[["total","TOTAL"],["24h","ÚLTIMAS 24H"],["hoje","HOJE"]].map(([k,l]) => (
                <button key={k} className="mbtn" onClick={() => setPeriod(k)}
                  style={{ background: period===k ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "none", color: period===k ? "#fff" : "#475569" }}>
                  {l}
                </button>
              ))}
            </div>
            <div style={{ width:1, height:28, background:"#1e293b" }} />
            <div style={{ display:"flex", background:"#0f172a", border:"1px solid #1e293b", borderRadius:7, padding:3 }}>
              {[["qty","QTD"],["brl","R$"]].map(([k,l]) => (
                <button key={k} className="mbtn" onClick={() => setMetric(k)}
                  style={{ background: metric===k ? "linear-gradient(135deg,#1d4ed8,#7c3aed)" : "none", color: metric===k ? "#fff" : "#475569" }}>
                  {l}
                </button>
              ))}
            </div>
            <div style={{ width:1, height:28, background:"#1e293b" }} />
            <button className="mbtn" onClick={() => setTryLast(p => !p)}
              style={{ background: tryLast ? "linear-gradient(135deg,#065f46,#047857)" : "#0f172a", color: tryLast ? "#6ee7b7" : "#475569", border:`1px solid ${tryLast?"#065f46":"#1e293b"}`, position:"relative" }}>
              {tryLast && <span style={{ position:"absolute", top:-5, right:-5, width:8, height:8, background:"#10b981", borderRadius:"50%", border:"1px solid #070b12" }} />}
              ÚLTIMO INTENTO / PAYER
            </button>
            {tryLast && removedCount > 0 && (
              <div style={{ background:"#1c1107", border:"1px solid #92400e", borderRadius:5, padding:"4px 10px", fontSize:10, color:"#fbbf24" }}>
                {removedCount} retentativa{removedCount>1?"s":""} removida{removedCount>1?"s":""}
              </div>
            )}
          </>}

          {/* ── Filtros Boleto & Pix ── */}
          {tab === "boletopix" && <>
            <div style={{ display:"flex", background:"#0f172a", border:"1px solid #1e293b", borderRadius:7, padding:3 }}>
              {[["30d","ÚLTIMOS 30 DIAS"],["month","MÊS ATUAL"]].map(([k,l]) => (
                <button key={k} className="mbtn" onClick={() => setBpPeriod(k)}
                  style={{ background: bpPeriod===k ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "none", color: bpPeriod===k ? "#fff" : "#475569" }}>
                  {l}
                </button>
              ))}
            </div>
            <div style={{ width:1, height:28, background:"#1e293b" }} />
            <div style={{ display:"flex", background:"#0f172a", border:"1px solid #1e293b", borderRadius:7, padding:3 }}>
              {[["all","TODOS"],["1305036763","1305036763"],["3166103110","3166103110"]].map(([k,l]) => (
                <button key={k} className="mbtn" onClick={() => setBpSeller(k)}
                  style={{ background: bpSeller===k ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "none", color: bpSeller===k ? "#fff" : "#475569" }}>
                  {l}
                </button>
              ))}
            </div>
            <div style={{ width:1, height:28, background:"#1e293b" }} />
            <div style={{ display:"flex", background:"#0f172a", border:"1px solid #1e293b", borderRadius:7, padding:3 }}>
              {[["all","TUDO"],["bolbradesco","BOLETO"],["pix","PIX"]].map(([k,l]) => (
                <button key={k} className="mbtn" onClick={() => setBpMetodo(k)}
                  style={{ background: bpMetodo===k ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "none", color: bpMetodo===k ? "#fff" : "#475569" }}>
                  {l}
                </button>
              ))}
            </div>
            <div style={{ width:1, height:28, background:"#1e293b" }} />
            <div style={{ display:"flex", background:"#0f172a", border:"1px solid #1e293b", borderRadius:7, padding:3 }}>
              {[["qty","QTD"],["brl","R$"]].map(([k,l]) => (
                <button key={k} className="mbtn" onClick={() => setBpMetric(k)}
                  style={{ background: bpMetric===k ? "linear-gradient(135deg,#1d4ed8,#7c3aed)" : "none", color: bpMetric===k ? "#fff" : "#475569" }}>
                  {l}
                </button>
              ))}
            </div>
          </>}

        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display:"flex", gap:8, marginBottom:16, alignItems:"flex-start" }}>

        {/* Grupo: Credit Card */}
        <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
          {/* badge estica para cobrir toda a largura do container de tabs */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:5, background:"#0a0f1a", border:"1px solid #1e3a5f", borderRadius:4, padding:"2px 8px" }}>
            <span style={{ fontSize:9 }}>💳</span>
            <span style={{ fontSize:8, color:"#93c5fd", letterSpacing:".12em", fontWeight:600 }}>CREDIT CARD</span>
          </div>
          <div style={{ display:"flex", gap:4, background:"#0f172a", borderRadius:7, padding:4, border:"1px solid #1e293b" }}>
            {[["overview","VISÃO GERAL"],["timeline","TIMELINE"],["transacoes","TRANSAÇÕES"]].map(([k,l]) => (
              <button key={k} className="tbtn" onClick={() => setTab(k)}
                style={{ color:tab===k?"#f1f5f9":"#475569", background:tab===k?"#1e3a5f":"none", fontWeight:tab===k?600:400 }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Grupo: Ticket & Bank Transfer */}
        <div style={{ display:"flex", flexDirection:"column", gap:3, alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, background:"#0a1a0a", border:"1px solid #14532d", borderRadius:4, padding:"2px 8px" }}>
            <span style={{ fontSize:9 }}>🧾</span>
            <span style={{ fontSize:8, color:"#86efac", letterSpacing:".12em", fontWeight:600 }}>TICKET & BANK_TRANSFER</span>
          </div>
          <div style={{ display:"flex", gap:4, background:"#0f172a", borderRadius:7, padding:4, border:"1px solid #1e293b" }}>
            <button className="tbtn" onClick={() => setTab("boletopix")}
              style={{ color:tab==="boletopix"?"#f1f5f9":"#64748b", background:tab==="boletopix"?"#1e293b":"none", fontWeight:tab==="boletopix"?600:400, borderRadius:5, border:tab==="boletopix"?"1px solid #334155":"1px solid transparent" }}>
              BOLETO & PIX
            </button>
          </div>
        </div>
      </div>

      <div className="fade" key={tab+metric+tryLast+period}>

        {/* ════ VISÃO GERAL ════ */}
        {tab==="overview" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

            {/* KPIs */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
              {[
                { l:"APROVAÇÃO",     v:`${aproVal}%`,                                     sub:statusLabel,                                                    color:statusColor },
                { l:"TOTAL",         v: metric==="qty"?total:brl(volTotal),               sub: metric==="qty"?"transações":"volume total"                     },
                { l:"APROVADAS",     v: metric==="qty"?approved.length:brl(volApproved),  sub:`${metric==="qty"?aproQty:aproBrl}%`                            },
                { l:"REJEITADAS",    v: metric==="qty"?rejected.length:brl(volRejected),  sub:`${metric==="qty"?pct(rejected.length,total):pct(volRejected,volTotal)}%` },
                { l:"VOL. APROVADO", v: brl(volApproved),                                 sub:`de ${brl(volTotal)} total`                                     },
              ].map(({ l, v, sub, color }) => (
                <div key={l} className="card" style={{ padding:"12px 14px" }}>
                  <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em" }}>{l}</div>
                  <div style={{ fontSize:20, fontWeight:700, color:color||"#f1f5f9", marginTop:4, lineHeight:1.1 }}>{v}</div>
                  <div style={{ fontSize:10, color:"#334155", marginTop:3 }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Pizza + Bandeiras */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div className="card" style={{ padding:"14px 16px" }}>
                <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:4 }}>STATUS · {metric==="qty"?"QUANTIDADE":"VALOR R$"}</div>
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={72} innerRadius={42} paddingAngle={3}>
                      {pieData.map((d,i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Legend formatter={v => <span style={{ fontSize:11, color:"#94a3b8" }}>{v}</span>} />
                    <Tooltip content={<Tip metric={metric} />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="card" style={{ padding:"14px 16px" }}>
                <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:14 }}>MIX DE BANDEIRAS · {metric==="qty"?"QTD":"R$"}</div>
                {methodData.map(({ name, qty, brl:b, share }) => {
                  const ms   = data.filter(r => r.method === name);
                  const ma   = ms.filter(r => r.status === "approved");
                  const volMs = ms.reduce((s,r)=>s+r.amount,0);
                  const volMa = ma.reduce((s,r)=>s+r.amount,0);
                  const aproM = metric==="qty" ? pct(ma.length,ms.length) : pct(volMa,volMs);
                  const col   = METHOD_COLORS[name]||"#64748b";
                  return (
                    <div key={name} style={{ marginBottom:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
                        <span style={{ color:"#f1f5f9", textTransform:"capitalize", fontWeight:600 }}>{name}</span>
                        <span style={{ color:col, fontWeight:600 }}>{metric==="qty"?`${qty} txns`:brl(b)} · {share}%</span>
                      </div>
                      <div style={{ background:"#1e293b", borderRadius:3, height:4, marginBottom:6 }}>
                        <div style={{ width:`${share}%`, height:"100%", background:col, borderRadius:3, transition:"width 1s" }} />
                      </div>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <span style={{ fontSize:10, color:"#475569" }}>Aprovação</span>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <div style={{ width:80, background:"#1e293b", borderRadius:3, height:4 }}>
                            <div style={{ width:`${aproM}%`, height:"100%", borderRadius:3, transition:"width 1s",
                              background: aproM>=75?"#22c55e":aproM>=50?"#f59e0b":"#ef4444" }} />
                          </div>
                          <span style={{ fontSize:11, fontWeight:700, minWidth:38, textAlign:"right",
                            color: aproM>=75?"#22c55e":aproM>=50?"#f59e0b":"#ef4444" }}>{aproM}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Mix de Pagamentos (Operation Type) ── */}
            <div className="card" style={{ padding:"14px 16px" }}>
              <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:14 }}>MIX DE PAGAMENTOS · {metric==="qty"?"QTD":"R$"}</div>
              {(() => {
                const opMap = {};
                data.forEach(r => {
                  if (!opMap[r.op]) opMap[r.op] = { qty:0, brl:0, apro_qty:0, apro_brl:0 };
                  opMap[r.op].qty++;
                  opMap[r.op].brl += r.amount;
                  if (r.status==="approved") { opMap[r.op].apro_qty++; opMap[r.op].apro_brl += r.amount; }
                });
                const opColors = { regular_payment:"#3b82f6", recurring_payment:"#a855f7" };
                const opLabels = { regular_payment:"Regular", recurring_payment:"Recorrente" };
                return Object.entries(opMap)
                  .sort((a,b) => b[1][metric] - a[1][metric])
                  .map(([op, v]) => {
                    const shareOp = pct(metric==="qty"?v.qty:v.brl, metric==="qty"?total:volTotal);
                    const aproOp  = metric==="qty" ? pct(v.apro_qty,v.qty) : pct(v.apro_brl,v.brl);
                    const col     = opColors[op]||"#10b981";
                    const label   = opLabels[op]||op.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());
                    return (
                      <div key={op} style={{ marginBottom:14 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
                          <span style={{ color:"#f1f5f9", fontWeight:600 }}>{label}</span>
                          <span style={{ color:col, fontWeight:600 }}>{metric==="qty"?`${v.qty} txns`:brl(v.brl)} · {shareOp}%</span>
                        </div>
                        <div style={{ background:"#1e293b", borderRadius:3, height:4, marginBottom:6 }}>
                          <div style={{ width:`${shareOp}%`, height:"100%", background:col, borderRadius:3, transition:"width 1s" }} />
                        </div>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                          <span style={{ fontSize:10, color:"#475569" }}>Aprovação</span>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <div style={{ width:80, background:"#1e293b", borderRadius:3, height:4 }}>
                              <div style={{ width:`${aproOp}%`, height:"100%", borderRadius:3, transition:"width 1s",
                                background: aproOp>=75?"#22c55e":aproOp>=50?"#f59e0b":"#ef4444" }} />
                            </div>
                            <span style={{ fontSize:11, fontWeight:700, minWidth:38, textAlign:"right",
                              color: aproOp>=75?"#22c55e":aproOp>=50?"#f59e0b":"#ef4444" }}>{aproOp}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  });
              })()}
            </div>

            {/* ── Rejeições (antes era aba separada) ── */}
            <div style={{ borderTop:"1px solid #1e293b", paddingTop:14 }}>
              <div style={{ fontSize:9, color:"#475569", letterSpacing:".15em", marginBottom:12 }}>ANÁLISE DE REJEIÇÕES</div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <div className="card" style={{ padding:"14px 16px" }}>
                  <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:10 }}>MOTIVOS · {metric==="qty"?"QUANTIDADE":"VALOR R$"}</div>
                  {rejData.length === 0
                    ? <div style={{ color:"#334155", fontSize:12, padding:"20px 0" }}>Nenhuma rejeição no período</div>
                    : (
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={rejData} layout="vertical" margin={{ left:0, right:28 }}>
                        <XAxis type="number" tick={{ fontSize:10, fill:"#475569" }} tickFormatter={v => metric==="brl"?`R$${v}`:v} />
                        <YAxis type="category" dataKey="short" tick={{ fontSize:10, fill:"#64748b" }} width={72} />
                        <Tooltip content={<Tip metric={metric} />} />
                        <Bar dataKey={metric} name={metric==="qty"?"Ocorrências":"Valor R$"} radius={[0,3,3,0]}>
                          {rejData.map((d,i) => <Cell key={i} fill={REJ_COLORS[d.code]||"#ef4444"} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>

                <div className="card" style={{ padding:"14px 16px" }}>
                  <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:10 }}>SHARE SOBRE TOTAL</div>
                  {rejData.length === 0
                    ? <div style={{ color:"#334155", fontSize:12 }}>Nenhuma rejeição no período</div>
                    : rejData.map((r,i) => (
                    <div key={i} style={{ background:"#070b12", borderRadius:5, padding:"9px 11px", marginBottom:7 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                        <span style={{ fontSize:11, color:"#cbd5e1" }}>{r.label}</span>
                        <span style={{ fontSize:13, fontWeight:700, color:REJ_COLORS[r.code]||"#ef4444" }}>
                          {metric==="qty"?`${r.shareQty}%`:`${r.shareBrl}%`}
                        </span>
                      </div>
                      <div style={{ fontSize:10, color:"#475569" }}>
                        {metric==="qty"?`${r.qty} ocorrência${r.qty>1?"s":""}`:brl(r.brl)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rejeições por bandeira */}
              <div className="card" style={{ padding:"14px 16px", marginTop:14 }}>
                <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:10 }}>REJEIÇÕES POR BANDEIRA</div>
                <div style={{ display:"flex", gap:10 }}>
                  {["master","visa","amex"].map(m => {
                    const ms   = data.filter(r => r.method===m);
                    const mr   = ms.filter(r => r.status==="rejected");
                    if (!ms.length) return null;
                    const volMs = ms.reduce((s,r)=>s+r.amount,0);
                    const volMr = mr.reduce((s,r)=>s+r.amount,0);
                    const rate  = metric==="qty" ? pct(mr.length,ms.length) : pct(volMr,volMs);
                    return (
                      <div key={m} style={{ flex:1, background:"#070b12", borderRadius:6, padding:"10px 12px" }}>
                        <div style={{ fontSize:10, color:METHOD_COLORS[m], fontWeight:600, textTransform:"capitalize", marginBottom:4 }}>{m}</div>
                        <div style={{ fontSize:22, fontWeight:700, color:"#f1f5f9" }}>{rate}%</div>
                        <div style={{ fontSize:10, color:"#475569" }}>
                          {metric==="qty"?`${mr.length}/${ms.length} rejeitadas`:`${brl(volMr)} / ${brl(volMs)}`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ TIMELINE ════ */}
        {tab==="timeline" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

            {/* Label do granularity */}
            <div style={{ fontSize:10, color:"#475569", display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ background:"#1e293b", borderRadius:4, padding:"3px 9px", color:"#94a3b8" }}>
                {timelineByHour ? "⏱ granularidade: por hora" : "📅 granularidade: por dia"}
              </span>
              <span style={{ color:"#334155" }}>— mude o filtro de período para alternar</span>
            </div>

            {/* Gráfico 1: aprovadas vs rejeitadas */}
            <div className="card" style={{ padding:"14px 16px" }}>
              <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:10 }}>
                APROVADAS VS REJEITADAS · {timelineByHour?"POR HORA":"POR DIA"} · {metric==="qty"?"QUANTIDADE":"VALOR R$"}
              </div>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={hourData} margin={{ left:0, right:10 }}>
                  <XAxis dataKey="label" tick={{ fontSize:10, fill:"#475569" }} />
                  <YAxis tick={{ fontSize:10, fill:"#475569" }} />
                  <Tooltip content={<Tip metric={metric} />} />
                  <Bar dataKey="Aprovadas"  stackId="a" fill="#22c55e" radius={[0,0,0,0]} />
                  <Bar dataKey="Rejeitadas" stackId="a" fill="#ef4444" radius={[3,3,0,0]} />
                  <Legend formatter={v => <span style={{ fontSize:11, color:"#94a3b8" }}>{v}</span>} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico 2: recusas empilhadas + linha aprovação */}
            <div className="card" style={{ padding:"14px 16px" }}>
              <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:10 }}>
                RECUSAS POR MOTIVO + TAXA DE APROVAÇÃO · {timelineByHour?"POR HORA":"POR DIA"} · {metric==="qty"?"QUANTIDADE":"VALOR R$"}
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <ComposedChart data={hourRejData} margin={{ left:0, right:44 }}>
                  <XAxis dataKey="label" tick={{ fontSize:10, fill:"#475569" }} />
                  <YAxis yAxisId="left"  tick={{ fontSize:10, fill:"#475569" }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize:10, fill:"#94a3b8" }} tickFormatter={v=>`${v}%`} domain={[0,100]} />
                  <Tooltip content={({ active, payload, label }) => {
                    if (!active||!payload?.length) return null;
                    return (
                      <div style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:7, padding:"9px 13px", fontSize:11 }}>
                        <div style={{ color:"#64748b", marginBottom:5, fontSize:10 }}>{label}</div>
                        {payload.map((p,i) => (
                          <div key={i} style={{ color:p.color||p.stroke||"#e2e8f0", marginBottom:2 }}>
                            {p.name}: {p.name==="Aprovação"?`${p.value}%`:metric==="brl"?brl(p.value):p.value}
                          </div>
                        ))}
                      </div>
                    );
                  }} />
                  {allRejCodes.map((code,i) => (
                    <Bar key={code} yAxisId="left" dataKey={REJ_SHORT[code]||code}
                      stackId="r" fill={REJ_COLORS[code]||"#ef4444"}
                      radius={i===allRejCodes.length-1?[3,3,0,0]:[0,0,0,0]} />
                  ))}
                  <Line yAxisId="right" type="monotone" dataKey="Aprovação"
                    stroke="#60a5fa" strokeWidth={2.5} dot={{ fill:"#60a5fa", r:4 }} />
                  <Legend formatter={v => <span style={{ fontSize:10, color:"#94a3b8" }}>{v}</span>} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Regular vs Recorrente */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {["regular_payment","recurring_payment"].map(op => {
                const ops   = data.filter(r => r.op===op);
                const apro  = ops.filter(r => r.status==="approved");
                const volOp = ops.reduce((s,r)=>s+r.amount,0);
                const volAp = apro.reduce((s,r)=>s+r.amount,0);
                const rate  = metric==="qty" ? pct(apro.length,ops.length) : pct(volAp,volOp);
                return (
                  <div key={op} className="card" style={{ padding:"12px 14px" }}>
                    <div style={{ fontSize:9, color:"#475569", letterSpacing:".1em", marginBottom:6 }}>{op.replace("_"," ").toUpperCase()}</div>
                    <div style={{ fontSize:22, fontWeight:700, color:"#f1f5f9" }}>
                      {metric==="qty"?ops.length:brl(volOp)}
                      <span style={{ fontSize:11, color:"#475569", marginLeft:4 }}>{metric==="qty"?"txns":"total"}</span>
                    </div>
                    <div style={{ fontSize:11, color:"#94a3b8", marginTop:4 }}>
                      Aprovação: <span style={{ color:"#22c55e", fontWeight:600 }}>{rate}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════ TRANSAÇÕES ════ */}
        {tab==="transacoes" && (
          <div className="card" style={{ padding:"14px 16px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em" }}>
                TRANSAÇÕES · {data.length} registros · {periodLabel}{tryLast?` · ${removedCount} retentativas excluídas`:""}
              </div>
              {tryLast && (
                <div style={{ fontSize:10, color:"#10b981", background:"#052e16", border:"1px solid #065f46", borderRadius:4, padding:"3px 9px" }}>
                  ✓ último intento / payer ativo
                </div>
              )}
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
                <thead>
                  <tr style={{ borderBottom:"1px solid #1e293b" }}>
                    {["ID","Data/Hora","Payer ID","Status","Detalhe","Valor","Bandeira","Operação"].map(h => (
                      <th key={h} style={{ textAlign:"left", padding:"6px 10px", color:"#475569", fontSize:9, letterSpacing:".1em", fontWeight:500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((r,i) => (
                    <tr key={r.id} style={{ borderBottom:"1px solid #0f172a", background:i%2===0?"transparent":"#070b12" }}>
                      <td style={{ padding:"7px 10px", color:"#334155", fontSize:10 }}>{r.id}</td>
                      <td style={{ padding:"7px 10px", color:"#64748b" }}>{r.date}</td>
                      <td style={{ padding:"7px 10px", color:"#475569", fontSize:10 }}>{r.payerId}</td>
                      <td style={{ padding:"7px 10px" }}>
                        <span style={{ background:STATUS_COLORS[r.status]+"22", color:STATUS_COLORS[r.status], borderRadius:4, padding:"2px 7px", fontSize:10, fontWeight:600 }}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ padding:"7px 10px", color:"#64748b", fontSize:10 }}>{REJ_LABEL[r.detail]||r.detail}</td>
                      <td style={{ padding:"7px 10px", color:"#94a3b8" }}>R$ {r.amount.toFixed(2)}</td>
                      <td style={{ padding:"7px 10px", color:METHOD_COLORS[r.method]||"#64748b", textTransform:"capitalize" }}>{r.method}</td>
                      <td style={{ padding:"7px 10px", color:"#475569", fontSize:10 }}>{r.op.replace("_payment","")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════ BOLETO & PIX ════ */}
        {tab==="boletopix" && <BoletoPixTab bpPeriod={bpPeriod} bpSeller={bpSeller} bpMetodo={bpMetodo} bpMetric={bpMetric} />}

      </div>
    </div>
  );
}
