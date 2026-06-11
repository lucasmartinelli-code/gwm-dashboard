import { useState, useMemo, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, ComposedChart, Line, CartesianGrid, LabelList } from "recharts";
import { RAW_BP, BP_UPDATED } from "./GWMBoletoPixData";

const RAW = [
  { id:"162821355661", payerId:"2215062744", collectorId:"3166103110", date:"11/06/2026 13:36", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"163626591908", payerId:"1818764955", collectorId:"3166103110", date:"11/06/2026 13:30", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163628772148", payerId:"2227401134", collectorId:"3166103110", date:"11/06/2026 13:23", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162821284361", payerId:"2227401134", collectorId:"3166103110", date:"11/06/2026 13:21", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:35, method:"master", op:"regular_payment" },
  { id:"163625346928", payerId:"1689807112", collectorId:"3166103110", date:"11/06/2026 13:12", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163626590324", payerId:"1406780693", collectorId:"3166103110", date:"11/06/2026 13:12", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163623481536", payerId:"1598575435", collectorId:"3166103110", date:"11/06/2026 13:09", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162816251503", payerId:"1499127566", collectorId:"3166103110", date:"11/06/2026 13:06", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"163618891786", payerId:"1597296476", collectorId:"3166103110", date:"11/06/2026 12:47", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163620644500", payerId:"1971960972", collectorId:"3166103110", date:"11/06/2026 12:41", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163618347192", payerId:"3467796924", collectorId:"3166103110", date:"11/06/2026 12:36", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163618346664", payerId:"3467796924", collectorId:"3166103110", date:"11/06/2026 12:31", status:"rejected", detail:"cc_rejected_high_risk", amount:35, method:"master", op:"regular_payment" },
  { id:"163616091510", payerId:"2245351124", collectorId:"3166103110", date:"11/06/2026 12:28", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162809351407", payerId:"1818755766", collectorId:"3166103110", date:"11/06/2026 12:27", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163616353218", payerId:"1656152822", collectorId:"3166103110", date:"11/06/2026 12:26", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162810160759", payerId:"1539753901", collectorId:"3166103110", date:"11/06/2026 12:25", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163615356250", payerId:"1627352607", collectorId:"3166103110", date:"11/06/2026 12:10", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163610651298", payerId:"1428266629", collectorId:"3166103110", date:"11/06/2026 11:55", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"163606487430", payerId:"2114382738", collectorId:"3166103110", date:"11/06/2026 11:33", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162799618413", payerId:"1608111206", collectorId:"3166103110", date:"11/06/2026 11:20", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163602274608", payerId:"1590559584", collectorId:"3166103110", date:"11/06/2026 10:55", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162793895259", payerId:"1696476470", collectorId:"3166103110", date:"11/06/2026 10:53", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162792357839", payerId:"1851459946", collectorId:"3166103110", date:"11/06/2026 10:49", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162792919263", payerId:"1685282026", collectorId:"3166103110", date:"11/06/2026 10:46", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162791569241", payerId:"1577890669", collectorId:"3166103110", date:"11/06/2026 10:37", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163599498538", payerId:"1853451493", collectorId:"3166103110", date:"11/06/2026 10:36", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162789912063", payerId:"1969075869", collectorId:"3166103110", date:"11/06/2026 10:36", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162789659975", payerId:"1362392968", collectorId:"3166103110", date:"11/06/2026 10:32", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162788940673", payerId:"1623669940", collectorId:"3166103110", date:"11/06/2026 10:10", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162787205385", payerId:"1623669940", collectorId:"3166103110", date:"11/06/2026 10:06", status:"rejected", detail:"cc_rejected_bad_filled_date", amount:35, method:"visa", op:"regular_payment" },
  { id:"162783864539", payerId:"1769650298", collectorId:"3166103110", date:"11/06/2026 09:29", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162779345659", payerId:"1521901398", collectorId:"3166103110", date:"11/06/2026 09:07", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163586561118", payerId:"1743066651", collectorId:"3166103110", date:"11/06/2026 09:04", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163586157024", payerId:"1892657482", collectorId:"3166103110", date:"11/06/2026 09:00", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162778647279", payerId:"1374132526", collectorId:"3166103110", date:"11/06/2026 08:55", status:"approved", detail:"accredited", amount:35, method:"visa", op:"recurring_payment" },
  { id:"162778896543", payerId:"1825918421", collectorId:"3166103110", date:"11/06/2026 08:46", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163583604730", payerId:"1662418044", collectorId:"3166103110", date:"11/06/2026 08:31", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163582373196", payerId:"1857752651", collectorId:"3166103110", date:"11/06/2026 08:25", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162774861673", payerId:"1595619938", collectorId:"3166103110", date:"11/06/2026 08:19", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163582202442", payerId:"1226334377", collectorId:"3166103110", date:"11/06/2026 08:10", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"163580249488", payerId:"1730806985", collectorId:"3166103110", date:"11/06/2026 08:05", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163581696300", payerId:"1769857865", collectorId:"3166103110", date:"11/06/2026 08:03", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163579671836", payerId:"1828906708", collectorId:"3166103110", date:"11/06/2026 08:03", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163579749298", payerId:"1621377477", collectorId:"3166103110", date:"11/06/2026 07:57", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162772811619", payerId:"1453377750", collectorId:"3166103110", date:"11/06/2026 07:57", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162774516137", payerId:"2333679069", collectorId:"3166103110", date:"11/06/2026 07:51", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162772876275", payerId:"1514080415", collectorId:"3166103110", date:"11/06/2026 07:32", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163576862960", payerId:"1937174625", collectorId:"3166103110", date:"11/06/2026 07:14", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163576504776", payerId:"1494062570", collectorId:"3166103110", date:"11/06/2026 07:04", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163572760404", payerId:"2207709645", collectorId:"3166103110", date:"11/06/2026 05:33", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162754809787", payerId:"1620020586", collectorId:"3166103110", date:"11/06/2026 01:12", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163558329150", payerId:"2169643241", collectorId:"3166103110", date:"11/06/2026 00:03", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"163558116140", payerId:"1622218196", collectorId:"3166103110", date:"10/06/2026 23:35", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162749267597", payerId:"1551369841", collectorId:"3166103110", date:"10/06/2026 23:32", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162751290397", payerId:"1651008339", collectorId:"3166103110", date:"10/06/2026 23:29", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162751236407", payerId:"1696476470", collectorId:"3166103110", date:"10/06/2026 23:28", status:"rejected", detail:"cc_rejected_high_risk", amount:350, method:"master", op:"regular_payment" },
  { id:"163554466912", payerId:"1599933515", collectorId:"3166103110", date:"10/06/2026 23:07", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163554754516", payerId:"1616575676", collectorId:"3166103110", date:"10/06/2026 23:07", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163550290038", payerId:"1588315544", collectorId:"3166103110", date:"10/06/2026 22:33", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163546714196", payerId:"1505503802", collectorId:"3166103110", date:"10/06/2026 21:48", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163540257262", payerId:"1464637777", collectorId:"3166103110", date:"10/06/2026 21:15", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162735750281", payerId:"1911628253", collectorId:"3166103110", date:"10/06/2026 21:12", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163537377832", payerId:"1741407970", collectorId:"3166103110", date:"10/06/2026 21:02", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162729859981", payerId:"1793668610", collectorId:"3166103110", date:"10/06/2026 20:54", status:"approved", detail:"accredited", amount:56, method:"elo", op:"regular_payment" },
  { id:"163537620738", payerId:"3466550086", collectorId:"3166103110", date:"10/06/2026 20:52", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162728464003", payerId:"1724947773", collectorId:"3166103110", date:"10/06/2026 20:45", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162730668537", payerId:"1597823614", collectorId:"3166103110", date:"10/06/2026 20:41", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163533217428", payerId:"1513671056", collectorId:"3166103110", date:"10/06/2026 20:31", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163532311058", payerId:"1305229568", collectorId:"3166103110", date:"10/06/2026 20:20", status:"approved", detail:"accredited", amount:56, method:"elo", op:"regular_payment" },
  { id:"163533378284", payerId:"1804005245", collectorId:"3166103110", date:"10/06/2026 20:19", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162724431875", payerId:"1696669396", collectorId:"3166103110", date:"10/06/2026 20:18", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163530182578", payerId:"1610579460", collectorId:"3166103110", date:"10/06/2026 20:03", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163525152146", payerId:"3464391365", collectorId:"3166103110", date:"10/06/2026 19:30", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162716590629", payerId:"1534035653", collectorId:"3166103110", date:"10/06/2026 19:20", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163519823720", payerId:"1613267709", collectorId:"3166103110", date:"10/06/2026 19:17", status:"approved", detail:"accredited", amount:56, method:"amex", op:"regular_payment" },
  { id:"163517929116", payerId:"1690695605", collectorId:"3166103110", date:"10/06/2026 19:01", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163517672530", payerId:"1647733722", collectorId:"3166103110", date:"10/06/2026 18:54", status:"approved", detail:"accredited", amount:56, method:"elo", op:"regular_payment" },
  { id:"162710238351", payerId:"3404181378", collectorId:"3166103110", date:"10/06/2026 18:44", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163513582020", payerId:"1792069379", collectorId:"3166103110", date:"10/06/2026 18:44", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163506118820", payerId:"1435982772", collectorId:"3166103110", date:"10/06/2026 17:58", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162697077741", payerId:"2124023879", collectorId:"3166103110", date:"10/06/2026 17:48", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162694541115", payerId:"2563312045", collectorId:"3166103110", date:"10/06/2026 17:28", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162694680549", payerId:"1665182787", collectorId:"3166103110", date:"10/06/2026 17:23", status:"approved", detail:"accredited", amount:35, method:"amex", op:"regular_payment" },
  { id:"163499540300", payerId:"1543203825", collectorId:"3166103110", date:"10/06/2026 17:17", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163499020432", payerId:"2040049776", collectorId:"3166103110", date:"10/06/2026 17:16", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"master", op:"regular_payment" },
  { id:"162690827867", payerId:"2206409358", collectorId:"3166103110", date:"10/06/2026 17:15", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163496993612", payerId:"2040049776", collectorId:"3166103110", date:"10/06/2026 17:15", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:35, method:"master", op:"regular_payment" },
  { id:"162691544945", payerId:"1877499572", collectorId:"3166103110", date:"10/06/2026 17:10", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163492537884", payerId:"1543412785", collectorId:"3166103110", date:"10/06/2026 16:51", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162689256477", payerId:"2359784926", collectorId:"3166103110", date:"10/06/2026 16:51", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163490363884", payerId:"1719053454", collectorId:"3166103110", date:"10/06/2026 16:39", status:"approved", detail:"accredited", amount:56, method:"elo", op:"regular_payment" },
  { id:"163490507052", payerId:"1547668094", collectorId:"3166103110", date:"10/06/2026 16:30", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162682908029", payerId:"1891971707", collectorId:"3166103110", date:"10/06/2026 16:29", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162684155249", payerId:"1636445638", collectorId:"3166103110", date:"10/06/2026 16:28", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162683583351", payerId:"1776274442", collectorId:"3166103110", date:"10/06/2026 16:25", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163490026610", payerId:"1454377562", collectorId:"3166103110", date:"10/06/2026 16:23", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163486705218", payerId:"2366506847", collectorId:"3166103110", date:"10/06/2026 16:06", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163485304976", payerId:"1608926580", collectorId:"3166103110", date:"10/06/2026 15:54", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163483951654", payerId:"1608926580", collectorId:"3166103110", date:"10/06/2026 15:53", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:56, method:"visa", op:"regular_payment" },
  { id:"163485556532", payerId:"1608926580", collectorId:"3166103110", date:"10/06/2026 15:51", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:56, method:"visa", op:"regular_payment" },
  { id:"162674311549", payerId:"1508373981", collectorId:"3166103110", date:"10/06/2026 15:24", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:56, method:"master", op:"regular_payment" },
  { id:"162670076593", payerId:"1506208197", collectorId:"3166103110", date:"10/06/2026 14:42", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162668465131", payerId:"1506208197", collectorId:"3166103110", date:"10/06/2026 14:39", status:"rejected", detail:"cc_rejected_card_disabled", amount:35, method:"visa", op:"regular_payment" },
  { id:"162669678321", payerId:"1506208197", collectorId:"3166103110", date:"10/06/2026 14:37", status:"rejected", detail:"cc_rejected_card_disabled", amount:35, method:"visa", op:"regular_payment" },
  { id:"162657565439", payerId:"1597387347", collectorId:"3166103110", date:"10/06/2026 13:31", status:"approved", detail:"accredited", amount:350, method:"elo", op:"regular_payment" },
  { id:"162655692779", payerId:"1839654279", collectorId:"3166103110", date:"10/06/2026 13:13", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163455511746", payerId:"1608185470", collectorId:"3166103110", date:"10/06/2026 12:52", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"163454061766", payerId:"1744079013", collectorId:"3166103110", date:"10/06/2026 12:46", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162650100349", payerId:"2298429355", collectorId:"3166103110", date:"10/06/2026 12:40", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162649174787", payerId:"1649948223", collectorId:"3166103110", date:"10/06/2026 12:40", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162646294869", payerId:"3303829536", collectorId:"3166103110", date:"10/06/2026 12:25", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162640835881", payerId:"1793560862", collectorId:"3166103110", date:"10/06/2026 12:07", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162640835347", payerId:"1870406578", collectorId:"3166103110", date:"10/06/2026 12:02", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162637273239", payerId:"1818186524", collectorId:"3166103110", date:"10/06/2026 11:39", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163439253776", payerId:"1573017074", collectorId:"3166103110", date:"10/06/2026 11:26", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162631444809", payerId:"1457678569", collectorId:"3166103110", date:"10/06/2026 11:00", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163435157700", payerId:"1397088100", collectorId:"3166103110", date:"10/06/2026 11:00", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163435610586", payerId:"1868385504", collectorId:"3166103110", date:"10/06/2026 10:50", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163435874158", payerId:"1807376305", collectorId:"3166103110", date:"10/06/2026 10:47", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163432891212", payerId:"1825199767", collectorId:"3166103110", date:"10/06/2026 10:40", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163431677280", payerId:"1479437768", collectorId:"3166103110", date:"10/06/2026 10:33", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163429411690", payerId:"1231598193", collectorId:"3166103110", date:"10/06/2026 10:20", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163429614774", payerId:"1519788830", collectorId:"3166103110", date:"10/06/2026 10:12", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163428192778", payerId:"1621241091", collectorId:"3166103110", date:"10/06/2026 10:03", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163426039268", payerId:"2492264357", collectorId:"3166103110", date:"10/06/2026 09:52", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162621372471", payerId:"2007570508", collectorId:"3166103110", date:"10/06/2026 09:49", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162618854993", payerId:"1875900997", collectorId:"3166103110", date:"10/06/2026 09:35", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163423031248", payerId:"1871319898", collectorId:"3166103110", date:"10/06/2026 09:30", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162617870139", payerId:"1606092561", collectorId:"3166103110", date:"10/06/2026 09:18", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162615741593", payerId:"1716888015", collectorId:"3166103110", date:"10/06/2026 09:17", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163421884650", payerId:"1551212048", collectorId:"3166103110", date:"10/06/2026 09:15", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162615693399", payerId:"1657754045", collectorId:"3166103110", date:"10/06/2026 09:14", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163420491622", payerId:"1716888015", collectorId:"3166103110", date:"10/06/2026 09:13", status:"rejected", detail:"cc_amount_rate_limit_exceeded", amount:350, method:"visa", op:"regular_payment" },
  { id:"163418707264", payerId:"1358047432", collectorId:"3166103110", date:"10/06/2026 08:54", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162612733929", payerId:"1612520009", collectorId:"3166103110", date:"10/06/2026 08:54", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162612213473", payerId:"1598378098", collectorId:"3166103110", date:"10/06/2026 08:45", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162613702107", payerId:"1269240868", collectorId:"3166103110", date:"10/06/2026 08:42", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162610829679", payerId:"2135688152", collectorId:"3166103110", date:"10/06/2026 08:36", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162610250507", payerId:"1640377514", collectorId:"3166103110", date:"10/06/2026 08:17", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162610602235", payerId:"1717718783", collectorId:"3166103110", date:"10/06/2026 08:17", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162610250367", payerId:"1529983056", collectorId:"3166103110", date:"10/06/2026 08:15", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162610422227", payerId:"1400820396", collectorId:"3166103110", date:"10/06/2026 08:14", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162609202977", payerId:"1824887259", collectorId:"3166103110", date:"10/06/2026 08:14", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"163414243236", payerId:"1930942864", collectorId:"3166103110", date:"10/06/2026 08:13", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162607935777", payerId:"1767779957", collectorId:"3166103110", date:"10/06/2026 08:13", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163413255684", payerId:"1595293213", collectorId:"3166103110", date:"10/06/2026 08:12", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163412078014", payerId:"1595293213", collectorId:"3166103110", date:"10/06/2026 08:08", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"master", op:"regular_payment" },
  { id:"163413074648", payerId:"1766152199", collectorId:"3166103110", date:"10/06/2026 07:56", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163412378766", payerId:"1564847302", collectorId:"3166103110", date:"10/06/2026 07:49", status:"approved", detail:"accredited", amount:56, method:"visa", op:"recurring_payment" },
  { id:"163410816596", payerId:"2218085007", collectorId:"3166103110", date:"10/06/2026 07:31", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162604287587", payerId:"1549964335", collectorId:"3166103110", date:"10/06/2026 07:29", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:35, method:"visa", op:"regular_payment" },
  { id:"163409846130", payerId:"1662046121", collectorId:"3166103110", date:"10/06/2026 07:07", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162604286385", payerId:"1565224636", collectorId:"3166103110", date:"10/06/2026 07:05", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"163408530406", payerId:"1493919549", collectorId:"3166103110", date:"10/06/2026 06:56", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162601138701", payerId:"1661254076", collectorId:"3166103110", date:"10/06/2026 06:25", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163404585044", payerId:"1964046978", collectorId:"3166103110", date:"10/06/2026 06:08", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162592477591", payerId:"1641449541", collectorId:"3166103110", date:"10/06/2026 03:19", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163391791042", payerId:"1524062150", collectorId:"3166103110", date:"10/06/2026 00:54", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162587342865", payerId:"2449733516", collectorId:"3166103110", date:"10/06/2026 00:41", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163388144260", payerId:"2080903204", collectorId:"3166103110", date:"09/06/2026 23:43", status:"rejected", detail:"cc_rejected_high_risk", amount:56, method:"master", op:"regular_payment" },
  { id:"162580760079", payerId:"2080903204", collectorId:"3166103110", date:"09/06/2026 23:41", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:56, method:"master", op:"regular_payment" },
  { id:"162580018735", payerId:"1824298302", collectorId:"3166103110", date:"09/06/2026 22:59", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162578471423", payerId:"1626168723", collectorId:"3166103110", date:"09/06/2026 22:52", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162576107065", payerId:"1615483329", collectorId:"3166103110", date:"09/06/2026 22:23", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162573869995", payerId:"1779308706", collectorId:"3166103110", date:"09/06/2026 22:09", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"163377752466", payerId:"1785325956", collectorId:"3166103110", date:"09/06/2026 21:57", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162565146083", payerId:"1620273583", collectorId:"3166103110", date:"09/06/2026 21:16", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163367765826", payerId:"1623425788", collectorId:"3166103110", date:"09/06/2026 21:04", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163366384554", payerId:"1833063076", collectorId:"3166103110", date:"09/06/2026 20:38", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162560289337", payerId:"1678174236", collectorId:"3166103110", date:"09/06/2026 20:34", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162559815227", payerId:"1641760543", collectorId:"3166103110", date:"09/06/2026 20:28", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162559508999", payerId:"2016096639", collectorId:"3166103110", date:"09/06/2026 20:24", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162558957121", payerId:"1518965164", collectorId:"3166103110", date:"09/06/2026 20:22", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162556599899", payerId:"1604882748", collectorId:"3166103110", date:"09/06/2026 20:15", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162559170139", payerId:"1526090650", collectorId:"3166103110", date:"09/06/2026 20:11", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163360828382", payerId:"1450037816", collectorId:"3166103110", date:"09/06/2026 20:01", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163359369084", payerId:"1633152572", collectorId:"3166103110", date:"09/06/2026 19:59", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162554222917", payerId:"2113309118", collectorId:"3166103110", date:"09/06/2026 19:50", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162553199135", payerId:"1721441299", collectorId:"3166103110", date:"09/06/2026 19:46", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162551114547", payerId:"1528879547", collectorId:"3166103110", date:"09/06/2026 19:28", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163353033114", payerId:"1614691440", collectorId:"3166103110", date:"09/06/2026 19:23", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163351382028", payerId:"1620273583", collectorId:"3166103110", date:"09/06/2026 19:22", status:"rejected", detail:"cc_rejected_bad_filled_date", amount:35, method:"visa", op:"regular_payment" },
  { id:"163351070654", payerId:"1867109141", collectorId:"3166103110", date:"09/06/2026 19:09", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163351380294", payerId:"1867109141", collectorId:"3166103110", date:"09/06/2026 19:06", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:35, method:"master", op:"regular_payment" },
  { id:"162542489683", payerId:"1710070856", collectorId:"3166103110", date:"09/06/2026 18:52", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162543624829", payerId:"1710070856", collectorId:"3166103110", date:"09/06/2026 18:50", status:"rejected", detail:"cc_rejected_insufficient_amount", amount:35, method:"master", op:"regular_payment" },
  { id:"162536501853", payerId:"1548641899", collectorId:"3166103110", date:"09/06/2026 18:19", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162538510377", payerId:"1220002453", collectorId:"3166103110", date:"09/06/2026 18:17", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162536781449", payerId:"1726624582", collectorId:"3166103110", date:"09/06/2026 18:17", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162537500899", payerId:"1618389250", collectorId:"3166103110", date:"09/06/2026 18:16", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"163337999860", payerId:"1830851120", collectorId:"3166103110", date:"09/06/2026 18:09", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163337642720", payerId:"1457680039", collectorId:"3166103110", date:"09/06/2026 17:56", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162532394511", payerId:"1915249310", collectorId:"3166103110", date:"09/06/2026 17:46", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163328451476", payerId:"1653922981", collectorId:"3166103110", date:"09/06/2026 17:14", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162520697471", payerId:"1505835249", collectorId:"3166103110", date:"09/06/2026 16:46", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163320550610", payerId:"2995497338", collectorId:"3166103110", date:"09/06/2026 16:11", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163308439246", payerId:"1703548600", collectorId:"3166103110", date:"09/06/2026 14:48", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162503268043", payerId:"1595528911", collectorId:"3166103110", date:"09/06/2026 14:46", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162503163903", payerId:"1510352431", collectorId:"3166103110", date:"09/06/2026 14:44", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163303187510", payerId:"2240196821", collectorId:"3166103110", date:"09/06/2026 14:14", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163302057476", payerId:"1584601836", collectorId:"3166103110", date:"09/06/2026 14:06", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162496988377", payerId:"1425468387", collectorId:"3166103110", date:"09/06/2026 13:43", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163296381976", payerId:"1728774946", collectorId:"3166103110", date:"09/06/2026 13:38", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163296478910", payerId:"1601067362", collectorId:"3166103110", date:"09/06/2026 13:26", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163296380490", payerId:"1740104289", collectorId:"3166103110", date:"09/06/2026 13:21", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162489915715", payerId:"1809439403", collectorId:"3166103110", date:"09/06/2026 13:17", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162490166649", payerId:"1740104289", collectorId:"3166103110", date:"09/06/2026 13:06", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:35, method:"master", op:"regular_payment" },
  { id:"163292245262", payerId:"3460932383", collectorId:"3166103110", date:"09/06/2026 13:06", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162489684703", payerId:"1740104289", collectorId:"3166103110", date:"09/06/2026 13:04", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"master", op:"regular_payment" },
  { id:"163285753152", payerId:"3460847207", collectorId:"3166103110", date:"09/06/2026 12:32", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162481629269", payerId:"1979149297", collectorId:"3166103110", date:"09/06/2026 12:27", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163284314184", payerId:"1825337495", collectorId:"3166103110", date:"09/06/2026 12:11", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163279405890", payerId:"1157055590", collectorId:"3166103110", date:"09/06/2026 12:03", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162475384557", payerId:"2569903265", collectorId:"3166103110", date:"09/06/2026 11:46", status:"approved", detail:"accredited", amount:350, method:"visa", op:"recurring_payment" },
  { id:"162471947879", payerId:"1644991675", collectorId:"3166103110", date:"09/06/2026 11:41", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163277466588", payerId:"1644991675", collectorId:"3166103110", date:"09/06/2026 11:39", status:"rejected", detail:"cc_rejected_high_risk", amount:56, method:"master", op:"regular_payment" },
  { id:"162473054809", payerId:"1421449625", collectorId:"3166103110", date:"09/06/2026 11:34", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162468738905", payerId:"1877188087", collectorId:"3166103110", date:"09/06/2026 11:10", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163271161058", payerId:"1511172106", collectorId:"3166103110", date:"09/06/2026 11:04", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"163272148448", payerId:"1832528082", collectorId:"3166103110", date:"09/06/2026 11:04", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163266036020", payerId:"1480100656", collectorId:"3166103110", date:"09/06/2026 10:44", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162460791043", payerId:"1764622831", collectorId:"3166103110", date:"09/06/2026 10:21", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163263621056", payerId:"1613386315", collectorId:"3166103110", date:"09/06/2026 10:13", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162459391559", payerId:"1627519657", collectorId:"3166103110", date:"09/06/2026 10:13", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162452180827", payerId:"2341414103", collectorId:"3166103110", date:"09/06/2026 09:09", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162448365069", payerId:"1792355018", collectorId:"3166103110", date:"09/06/2026 08:38", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162446389943", payerId:"1555401084", collectorId:"3166103110", date:"09/06/2026 08:33", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162446791535", payerId:"1533332483", collectorId:"3166103110", date:"09/06/2026 08:30", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163249899724", payerId:"1530034030", collectorId:"3166103110", date:"09/06/2026 08:28", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162443217497", payerId:"2006826959", collectorId:"3166103110", date:"09/06/2026 07:45", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163243185668", payerId:"1680882429", collectorId:"3166103110", date:"09/06/2026 07:05", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163243922384", payerId:"3310581916", collectorId:"3166103110", date:"09/06/2026 06:57", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162438957083", payerId:"1609605744", collectorId:"3166103110", date:"09/06/2026 06:40", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162437596937", payerId:"2236160662", collectorId:"3166103110", date:"09/06/2026 06:11", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162438040615", payerId:"1438863453", collectorId:"3166103110", date:"09/06/2026 06:11", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162437194165", payerId:"1810881394", collectorId:"3166103110", date:"09/06/2026 05:44", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162426364443", payerId:"2201771743", collectorId:"3166103110", date:"09/06/2026 01:00", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"162421892777", payerId:"1614623100", collectorId:"3166103110", date:"09/06/2026 00:00", status:"rejected", detail:"cc_rejected_card_disabled", amount:35, method:"visa", op:"regular_payment" },
  { id:"162414083933", payerId:"1650840585", collectorId:"3166103110", date:"08/06/2026 22:35", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163214545696", payerId:"1481220506", collectorId:"3166103110", date:"08/06/2026 22:16", status:"approved", detail:"accredited", amount:56, method:"visa", op:"recurring_payment" },
  { id:"162412685099", payerId:"1487844320", collectorId:"3166103110", date:"08/06/2026 22:14", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163210724412", payerId:"2115420432", collectorId:"3166103110", date:"08/06/2026 21:35", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162408592269", payerId:"2126999853", collectorId:"3166103110", date:"08/06/2026 21:34", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163202671144", payerId:"1502361536", collectorId:"3166103110", date:"08/06/2026 20:42", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163200965670", payerId:"2201169797", collectorId:"3166103110", date:"08/06/2026 20:33", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162391730655", payerId:"1529434516", collectorId:"3166103110", date:"08/06/2026 19:47", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163192581836", payerId:"1529434516", collectorId:"3166103110", date:"08/06/2026 19:46", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163193966184", payerId:"1529434516", collectorId:"3166103110", date:"08/06/2026 19:45", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162385246775", payerId:"1709362797", collectorId:"3166103110", date:"08/06/2026 19:14", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162383809091", payerId:"1662086395", collectorId:"3166103110", date:"08/06/2026 19:10", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163183333442", payerId:"1658427649", collectorId:"3166103110", date:"08/06/2026 19:00", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162372792759", payerId:"1521903906", collectorId:"3166103110", date:"08/06/2026 18:09", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162366808021", payerId:"1658223852", collectorId:"3166103110", date:"08/06/2026 17:50", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163169822456", payerId:"1590759645", collectorId:"3166103110", date:"08/06/2026 17:39", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163166897458", payerId:"1550133283", collectorId:"3166103110", date:"08/06/2026 17:34", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162358926709", payerId:"2527992836", collectorId:"3166103110", date:"08/06/2026 16:50", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163159413088", payerId:"1398189417", collectorId:"3166103110", date:"08/06/2026 16:45", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163151031016", payerId:"1632354779", collectorId:"3166103110", date:"08/06/2026 15:49", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162349142761", payerId:"1421066154", collectorId:"3166103110", date:"08/06/2026 15:48", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162347404721", payerId:"2219471347", collectorId:"3166103110", date:"08/06/2026 15:36", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162347404423", payerId:"1458283396", collectorId:"3166103110", date:"08/06/2026 15:32", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162347348453", payerId:"2147412816", collectorId:"3166103110", date:"08/06/2026 15:31", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162343722165", payerId:"1445375373", collectorId:"3166103110", date:"08/06/2026 15:03", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162340362975", payerId:"1466394524", collectorId:"3166103110", date:"08/06/2026 14:47", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163142712420", payerId:"1466394524", collectorId:"3166103110", date:"08/06/2026 14:46", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163136471364", payerId:"1773985408", collectorId:"3166103110", date:"08/06/2026 14:15", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"163135455874", payerId:"1523678748", collectorId:"3166103110", date:"08/06/2026 14:14", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163124857862", payerId:"2334448863", collectorId:"3166103110", date:"08/06/2026 13:16", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163123380668", payerId:"1839599106", collectorId:"3166103110", date:"08/06/2026 12:53", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162321804413", payerId:"1649258890", collectorId:"3166103110", date:"08/06/2026 12:53", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163113879666", payerId:"1533684118", collectorId:"3166103110", date:"08/06/2026 12:19", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162310232737", payerId:"2358004572", collectorId:"3166103110", date:"08/06/2026 11:57", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162310026461", payerId:"1851871932", collectorId:"3166103110", date:"08/06/2026 11:52", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162304887497", payerId:"1487038775", collectorId:"3166103110", date:"08/06/2026 11:35", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163104819466", payerId:"1241163348", collectorId:"3166103110", date:"08/06/2026 11:25", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163097341444", payerId:"1559723776", collectorId:"3166103110", date:"08/06/2026 10:36", status:"approved", detail:"accredited", amount:56, method:"visa", op:"recurring_payment" },
  { id:"162290627283", payerId:"1533890666", collectorId:"3166103110", date:"08/06/2026 09:57", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"162288314073", payerId:"1517577873", collectorId:"3166103110", date:"08/06/2026 09:49", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162287814613", payerId:"1540257759", collectorId:"3166103110", date:"08/06/2026 09:26", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162281405675", payerId:"1485595464", collectorId:"3166103110", date:"08/06/2026 08:50", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"163080999648", payerId:"1586056581", collectorId:"3166103110", date:"08/06/2026 08:31", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163083160410", payerId:"1556557513", collectorId:"3166103110", date:"08/06/2026 08:31", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162277633909", payerId:"1725900331", collectorId:"3166103110", date:"08/06/2026 08:17", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163082350142", payerId:"1530111406", collectorId:"3166103110", date:"08/06/2026 08:15", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163078831738", payerId:"1812899011", collectorId:"3166103110", date:"08/06/2026 08:15", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162276439847", payerId:"1226334377", collectorId:"3166103110", date:"08/06/2026 08:03", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:350, method:"master", op:"regular_payment" },
  { id:"163078631254", payerId:"1612605280", collectorId:"3166103110", date:"08/06/2026 08:03", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162275671337", payerId:"1551595980", collectorId:"3166103110", date:"08/06/2026 07:42", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163079382164", payerId:"1551203593", collectorId:"3166103110", date:"08/06/2026 07:41", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163078830286", payerId:"1241211651", collectorId:"3166103110", date:"08/06/2026 07:38", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162270401005", payerId:"1481169665", collectorId:"3166103110", date:"08/06/2026 06:30", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163066137452", payerId:"1575525992", collectorId:"3166103110", date:"08/06/2026 04:50", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163066011596", payerId:"3459511376", collectorId:"3166103110", date:"08/06/2026 04:35", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163066193180", payerId:"2333551054", collectorId:"3166103110", date:"08/06/2026 04:31", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163065963050", payerId:"1529395971", collectorId:"3166103110", date:"08/06/2026 03:35", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162254435257", payerId:"1511953063", collectorId:"3166103110", date:"07/06/2026 23:29", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"163052945718", payerId:"1625514392", collectorId:"3166103110", date:"07/06/2026 23:09", status:"rejected", detail:"cc_rejected_card_disabled", amount:56, method:"visa", op:"recurring_payment" },
  { id:"163052835222", payerId:"1582930291", collectorId:"3166103110", date:"07/06/2026 22:59", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162253120207", payerId:"1674345561", collectorId:"3166103110", date:"07/06/2026 22:54", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162246629373", payerId:"1652903806", collectorId:"3166103110", date:"07/06/2026 22:04", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162246628485", payerId:"1700434023", collectorId:"3166103110", date:"07/06/2026 21:52", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162246208675", payerId:"1700434023", collectorId:"3166103110", date:"07/06/2026 21:50", status:"rejected", detail:"cc_rejected_high_risk", amount:35, method:"master", op:"regular_payment" },
  { id:"162246358597", payerId:"1544334610", collectorId:"3166103110", date:"07/06/2026 21:50", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163047246424", payerId:"1700434023", collectorId:"3166103110", date:"07/06/2026 21:48", status:"rejected", detail:"cc_rejected_high_risk", amount:35, method:"master", op:"regular_payment" },
  { id:"163042148730", payerId:"1550985712", collectorId:"3166103110", date:"07/06/2026 21:10", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"163038562014", payerId:"1626264381", collectorId:"3166103110", date:"07/06/2026 20:56", status:"approved", detail:"accredited", amount:350, method:"elo", op:"regular_payment" },
  { id:"162229007715", payerId:"1824615608", collectorId:"3166103110", date:"07/06/2026 19:46", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"163029656552", payerId:"1623203442", collectorId:"3166103110", date:"07/06/2026 19:30", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163026894988", payerId:"1679174452", collectorId:"3166103110", date:"07/06/2026 19:14", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162222859573", payerId:"1534185502", collectorId:"3166103110", date:"07/06/2026 18:56", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162219395975", payerId:"1302646737", collectorId:"3166103110", date:"07/06/2026 18:34", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"163019237630", payerId:"1507048075", collectorId:"3166103110", date:"07/06/2026 18:22", status:"approved", detail:"accredited", amount:35, method:"amex", op:"regular_payment" },
  { id:"163014175408", payerId:"1580300545", collectorId:"3166103110", date:"07/06/2026 17:36", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163012750728", payerId:"1601272553", collectorId:"3166103110", date:"07/06/2026 17:16", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162205183993", payerId:"1822113154", collectorId:"3166103110", date:"07/06/2026 16:32", status:"approved", detail:"accredited", amount:56, method:"amex", op:"regular_payment" },
  { id:"163006560826", payerId:"2537500248", collectorId:"3166103110", date:"07/06/2026 16:20", status:"approved", detail:"accredited", amount:56, method:"elo", op:"regular_payment" },
  { id:"162204686595", payerId:"1532313320", collectorId:"3166103110", date:"07/06/2026 16:07", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162204686425", payerId:"1578958600", collectorId:"3166103110", date:"07/06/2026 16:05", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"163002307718", payerId:"1522342023", collectorId:"3166103110", date:"07/06/2026 15:54", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162198791901", payerId:"1741449177", collectorId:"3166103110", date:"07/06/2026 15:29", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162196815455", payerId:"1358047432", collectorId:"3166103110", date:"07/06/2026 15:09", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162198242381", payerId:"1527157204", collectorId:"3166103110", date:"07/06/2026 15:07", status:"rejected", detail:"cc_rejected_insufficient_amount", amount:35, method:"visa", op:"regular_payment" },
  { id:"162192945749", payerId:"1292414420", collectorId:"3166103110", date:"07/06/2026 14:38", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162992594126", payerId:"1563208710", collectorId:"3166103110", date:"07/06/2026 14:09", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162189385335", payerId:"1735115002", collectorId:"3166103110", date:"07/06/2026 14:05", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162984623836", payerId:"1636319703", collectorId:"3166103110", date:"07/06/2026 13:28", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162982245880", payerId:"1598688679", collectorId:"3166103110", date:"07/06/2026 13:13", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162975956038", payerId:"1568128171", collectorId:"3166103110", date:"07/06/2026 12:35", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162173797747", payerId:"1532028666", collectorId:"3166103110", date:"07/06/2026 12:19", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162974899074", payerId:"1328350528", collectorId:"3166103110", date:"07/06/2026 12:15", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162972805188", payerId:"2116924442", collectorId:"3166103110", date:"07/06/2026 11:58", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162972841166", payerId:"1781554087", collectorId:"3166103110", date:"07/06/2026 11:57", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"162171221503", payerId:"1887647753", collectorId:"3166103110", date:"07/06/2026 11:54", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162171084845", payerId:"1624687054", collectorId:"3166103110", date:"07/06/2026 11:46", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162970733378", payerId:"1258219056", collectorId:"3166103110", date:"07/06/2026 11:44", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162170846445", payerId:"1370855802", collectorId:"3166103110", date:"07/06/2026 11:40", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162969905630", payerId:"1605060237", collectorId:"3166103110", date:"07/06/2026 11:39", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162970732252", payerId:"1724870393", collectorId:"3166103110", date:"07/06/2026 11:33", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162166993013", payerId:"1184768937", collectorId:"3166103110", date:"07/06/2026 11:17", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162164171233", payerId:"1649683595", collectorId:"3166103110", date:"07/06/2026 10:55", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162964603294", payerId:"1434410258", collectorId:"3166103110", date:"07/06/2026 10:54", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162161981371", payerId:"1378264526", collectorId:"3166103110", date:"07/06/2026 10:35", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162160645923", payerId:"1516166797", collectorId:"3166103110", date:"07/06/2026 10:26", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162160923237", payerId:"1615313909", collectorId:"3166103110", date:"07/06/2026 10:21", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162161320743", payerId:"1540880502", collectorId:"3166103110", date:"07/06/2026 10:20", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162960392848", payerId:"1795778687", collectorId:"3166103110", date:"07/06/2026 10:04", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162959804926", payerId:"1626095624", collectorId:"3166103110", date:"07/06/2026 09:59", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162959654886", payerId:"1662153151", collectorId:"3166103110", date:"07/06/2026 09:56", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162960282192", payerId:"1534642118", collectorId:"3166103110", date:"07/06/2026 09:56", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"162157671797", payerId:"1131643186", collectorId:"3166103110", date:"07/06/2026 09:46", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162955911518", payerId:"1603690729", collectorId:"3166103110", date:"07/06/2026 09:10", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162156216295", payerId:"1164700312", collectorId:"3166103110", date:"07/06/2026 09:04", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162154923969", payerId:"1462803294", collectorId:"3166103110", date:"07/06/2026 09:04", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162154923775", payerId:"1462803294", collectorId:"3166103110", date:"07/06/2026 09:01", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:350, method:"master", op:"regular_payment" },
  { id:"162955036918", payerId:"1560763025", collectorId:"3166103110", date:"07/06/2026 08:44", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162153965705", payerId:"1562372671", collectorId:"3166103110", date:"07/06/2026 08:43", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162153864247", payerId:"1627562076", collectorId:"3166103110", date:"07/06/2026 08:17", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162153156761", payerId:"1753245142", collectorId:"3166103110", date:"07/06/2026 08:05", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162152608807", payerId:"1390394293", collectorId:"3166103110", date:"07/06/2026 07:50", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162950518030", payerId:"1593975160", collectorId:"3166103110", date:"07/06/2026 06:57", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162950605838", payerId:"1773474261", collectorId:"3166103110", date:"07/06/2026 06:51", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162149475743", payerId:"3404245472", collectorId:"3166103110", date:"07/06/2026 06:28", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162950572524", payerId:"1525035690", collectorId:"3166103110", date:"07/06/2026 06:03", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162148337667", payerId:"1747995645", collectorId:"3166103110", date:"07/06/2026 05:39", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162148201639", payerId:"1747995645", collectorId:"3166103110", date:"07/06/2026 05:31", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:350, method:"master", op:"regular_payment" },
  { id:"162143172553", payerId:"2361229165", collectorId:"3166103110", date:"07/06/2026 01:54", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162929453736", payerId:"1663707167", collectorId:"3166103110", date:"06/06/2026 23:12", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162129239503", payerId:"1615565647", collectorId:"3166103110", date:"06/06/2026 23:08", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162922138016", payerId:"1575779532", collectorId:"3166103110", date:"06/06/2026 22:08", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162922904608", payerId:"3456849042", collectorId:"3166103110", date:"06/06/2026 21:59", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162118936755", payerId:"1575779532", collectorId:"3166103110", date:"06/06/2026 21:36", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:56, method:"visa", op:"regular_payment" },
  { id:"162117597109", payerId:"2952422805", collectorId:"3166103110", date:"06/06/2026 21:31", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162916190398", payerId:"1733131932", collectorId:"3166103110", date:"06/06/2026 21:12", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162109176363", payerId:"1254855722", collectorId:"3166103110", date:"06/06/2026 20:29", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162104905395", payerId:"1328350528", collectorId:"3166103110", date:"06/06/2026 20:16", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"master", op:"regular_payment" },
  { id:"162101116635", payerId:"1901678565", collectorId:"3166103110", date:"06/06/2026 19:44", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162099556709", payerId:"1573254388", collectorId:"3166103110", date:"06/06/2026 19:36", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162895746454", payerId:"1574321976", collectorId:"3166103110", date:"06/06/2026 19:12", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162086151121", payerId:"1645991345", collectorId:"3166103110", date:"06/06/2026 18:27", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162085348557", payerId:"1571119908", collectorId:"3166103110", date:"06/06/2026 18:19", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162081078771", payerId:"1554965178", collectorId:"3166103110", date:"06/06/2026 17:56", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162879690496", payerId:"1805343602", collectorId:"3166103110", date:"06/06/2026 17:45", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162076982699", payerId:"1606657626", collectorId:"3166103110", date:"06/06/2026 17:32", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162866313054", payerId:"1451474958", collectorId:"3166103110", date:"06/06/2026 16:26", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162065149001", payerId:"1546753959", collectorId:"3166103110", date:"06/06/2026 16:19", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162864007306", payerId:"2290390330", collectorId:"3166103110", date:"06/06/2026 16:15", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162062387313", payerId:"2552166185", collectorId:"3166103110", date:"06/06/2026 16:04", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162062386887", payerId:"2552166185", collectorId:"3166103110", date:"06/06/2026 16:00", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:56, method:"master", op:"regular_payment" },
  { id:"162859672964", payerId:"1939263643", collectorId:"3166103110", date:"06/06/2026 15:41", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162057351869", payerId:"1504450315", collectorId:"3166103110", date:"06/06/2026 15:37", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162059784297", payerId:"1504450315", collectorId:"3166103110", date:"06/06/2026 15:36", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:56, method:"master", op:"regular_payment" },
  { id:"162058754653", payerId:"1532468164", collectorId:"3166103110", date:"06/06/2026 15:33", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162057651061", payerId:"1547717474", collectorId:"3166103110", date:"06/06/2026 15:30", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162853505408", payerId:"1392715792", collectorId:"3166103110", date:"06/06/2026 15:06", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162051170859", payerId:"1478363702", collectorId:"3166103110", date:"06/06/2026 14:46", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162850040426", payerId:"1649683595", collectorId:"3166103110", date:"06/06/2026 14:34", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:35, method:"visa", op:"regular_payment" },
  { id:"162848355314", payerId:"1500279737", collectorId:"3166103110", date:"06/06/2026 14:32", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162845949756", payerId:"1576666056", collectorId:"3166103110", date:"06/06/2026 14:22", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162846850742", payerId:"1617021533", collectorId:"3166103110", date:"06/06/2026 14:17", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162030408925", payerId:"1630888342", collectorId:"3166103110", date:"06/06/2026 12:50", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162027419689", payerId:"1608752372", collectorId:"3166103110", date:"06/06/2026 12:44", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162818686182", payerId:"1674670669", collectorId:"3166103110", date:"06/06/2026 11:41", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162016397259", payerId:"1498635707", collectorId:"3166103110", date:"06/06/2026 11:39", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162813094028", payerId:"2685997336", collectorId:"3166103110", date:"06/06/2026 11:28", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"162813092562", payerId:"1746393361", collectorId:"3166103110", date:"06/06/2026 11:13", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162007331479", payerId:"1509404821", collectorId:"3166103110", date:"06/06/2026 10:46", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162008476107", payerId:"1625351313", collectorId:"3166103110", date:"06/06/2026 10:41", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162006923179", payerId:"1634882286", collectorId:"3166103110", date:"06/06/2026 10:41", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162004407985", payerId:"2109608951", collectorId:"3166103110", date:"06/06/2026 10:32", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162003388089", payerId:"1734920849", collectorId:"3166103110", date:"06/06/2026 10:24", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162803147152", payerId:"1459194728", collectorId:"3166103110", date:"06/06/2026 10:14", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162000123079", payerId:"1544348733", collectorId:"3166103110", date:"06/06/2026 09:48", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162796179396", payerId:"1508648986", collectorId:"3166103110", date:"06/06/2026 09:14", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161994262349", payerId:"1547857443", collectorId:"3166103110", date:"06/06/2026 08:36", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162792291598", payerId:"1839663558", collectorId:"3166103110", date:"06/06/2026 08:30", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162788657448", payerId:"1907578067", collectorId:"3166103110", date:"06/06/2026 07:18", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162786299392", payerId:"3453166991", collectorId:"3166103110", date:"06/06/2026 06:04", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161966894957", payerId:"1399151560", collectorId:"3166103110", date:"05/06/2026 23:26", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162763613054", payerId:"1241438456", collectorId:"3166103110", date:"05/06/2026 22:55", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162762793540", payerId:"2455014785", collectorId:"3166103110", date:"05/06/2026 22:54", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161961807659", payerId:"1742074690", collectorId:"3166103110", date:"05/06/2026 22:42", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162762042644", payerId:"1745934349", collectorId:"3166103110", date:"05/06/2026 22:40", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162761758382", payerId:"1745934349", collectorId:"3166103110", date:"05/06/2026 22:36", status:"rejected", detail:"cc_rejected_bad_filled_date", amount:56, method:"amex", op:"regular_payment" },
  { id:"161961534547", payerId:"1564574417", collectorId:"3166103110", date:"05/06/2026 22:30", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162756231884", payerId:"1634825174", collectorId:"3166103110", date:"05/06/2026 22:04", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161957298829", payerId:"1488067503", collectorId:"3166103110", date:"05/06/2026 22:01", status:"approved", detail:"accredited", amount:56, method:"visa", op:"recurring_payment" },
  { id:"161940073049", payerId:"1545918525", collectorId:"3166103110", date:"05/06/2026 20:28", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162736881270", payerId:"1535192921", collectorId:"3166103110", date:"05/06/2026 20:17", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161932605599", payerId:"2097600581", collectorId:"3166103110", date:"05/06/2026 19:53", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161929970321", payerId:"1858882556", collectorId:"3166103110", date:"05/06/2026 19:30", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162728538428", payerId:"1640549802", collectorId:"3166103110", date:"05/06/2026 19:26", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162720663288", payerId:"1502425772", collectorId:"3166103110", date:"05/06/2026 18:58", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161919247359", payerId:"1486319231", collectorId:"3166103110", date:"05/06/2026 18:48", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162713809316", payerId:"1776001518", collectorId:"3166103110", date:"05/06/2026 18:24", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161913855151", payerId:"2562290513", collectorId:"3166103110", date:"05/06/2026 18:22", status:"rejected", detail:"cc_rejected_card_disabled", amount:56, method:"visa", op:"regular_payment" },
  { id:"161910904719", payerId:"3043901910", collectorId:"3166103110", date:"05/06/2026 18:02", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162709196808", payerId:"3043901910", collectorId:"3166103110", date:"05/06/2026 17:58", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"master", op:"regular_payment" },
  { id:"161907295237", payerId:"1877361573", collectorId:"3166103110", date:"05/06/2026 17:50", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162694641982", payerId:"1498893249", collectorId:"3166103110", date:"05/06/2026 16:58", status:"approved", detail:"accredited", amount:20, method:"master", op:"regular_payment" },
  { id:"161895174043", payerId:"1498893249", collectorId:"3166103110", date:"05/06/2026 16:56", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:20, method:"master", op:"regular_payment" },
  { id:"161895439657", payerId:"1549235826", collectorId:"3166103110", date:"05/06/2026 16:54", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"162689958850", payerId:"1726677693", collectorId:"3166103110", date:"05/06/2026 16:19", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"162690084170", payerId:"1515511357", collectorId:"3166103110", date:"05/06/2026 16:12", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161881295519", payerId:"2578135868", collectorId:"3166103110", date:"05/06/2026 15:29", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161883026139", payerId:"1698053938", collectorId:"3166103110", date:"05/06/2026 15:24", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162678688362", payerId:"1633811226", collectorId:"3166103110", date:"05/06/2026 15:05", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"162675409722", payerId:"1399101660", collectorId:"3166103110", date:"05/06/2026 14:57", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"162670093578", payerId:"1615188907", collectorId:"3166103110", date:"05/06/2026 14:24", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"162670245018", payerId:"1670398738", collectorId:"3166103110", date:"05/06/2026 14:19", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161861343881", payerId:"1637785261", collectorId:"3166103110", date:"05/06/2026 13:31", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161859921967", payerId:"1432072244", collectorId:"3166103110", date:"05/06/2026 13:24", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162657099208", payerId:"1617510629", collectorId:"3166103110", date:"05/06/2026 13:08", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"162656677460", payerId:"1614583272", collectorId:"3166103110", date:"05/06/2026 13:07", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161855293939", payerId:"1616507328", collectorId:"3166103110", date:"05/06/2026 13:01", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
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
  { id:"161789902623", payerId:"1553768003", collectorId:"3166103110", date:"05/06/2026 01:14", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" }
];

const COLLECTOR_ID = "3166103110";
const LAST_UPDATED = "11/06/2026 14:11";
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

  const periodLabel = period === "total" ? "ÚLTIMOS 7 DIAS" : period === "hoje" ? `HOJE (${LATEST_DATE})` : "ÚLTIMAS 24H";

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
              {[["total","ÚLTIMOS 7 DIAS"],["24h","ÚLTIMAS 24H"],["hoje","HOJE"]].map(([k,l]) => (
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
