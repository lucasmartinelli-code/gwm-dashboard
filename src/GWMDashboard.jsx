import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, ComposedChart, Line } from "recharts";

const RAW = [
  { id:"161501715460", payerId:"1711696417", collectorId:"3166103110", date:"29/05/2026 09:07", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160711764815", payerId:"1772204258", collectorId:"3166103110", date:"29/05/2026 09:04", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161501521296", payerId:"1524283795", collectorId:"3166103110", date:"29/05/2026 09:03", status:"rejected", detail:"cc_rejected_high_risk", amount:35, method:"master", op:"regular_payment" },
  { id:"160712406113", payerId:"1524283795", collectorId:"3166103110", date:"29/05/2026 09:01", status:"rejected", detail:"cc_rejected_high_risk", amount:35, method:"visa", op:"regular_payment" },
  { id:"161501714748", payerId:"1524283795", collectorId:"3166103110", date:"29/05/2026 08:59", status:"rejected", detail:"cc_rejected_high_risk", amount:35, method:"visa", op:"regular_payment" },
  { id:"161501048960", payerId:"1533081685", collectorId:"3166103110", date:"29/05/2026 08:57", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161498389574", payerId:"1548684003", collectorId:"3166103110", date:"29/05/2026 08:41", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161499158818", payerId:"2458419085", collectorId:"3166103110", date:"29/05/2026 08:37", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160707501279", payerId:"1548684003", collectorId:"3166103110", date:"29/05/2026 08:33", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160707500779", payerId:"1582697482", collectorId:"3166103110", date:"29/05/2026 08:27", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161495204042", payerId:"1844142558", collectorId:"3166103110", date:"29/05/2026 08:20", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161495355696", payerId:"1844142558", collectorId:"3166103110", date:"29/05/2026 08:16", status:"rejected", detail:"cc_rejected_bad_filled_date", amount:35, method:"visa", op:"regular_payment" },
  { id:"161495183842", payerId:"1281050482", collectorId:"3166103110", date:"29/05/2026 08:15", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160705918927", payerId:"1788062663", collectorId:"3166103110", date:"29/05/2026 08:14", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160702575555", payerId:"1552810705", collectorId:"3166103110", date:"29/05/2026 07:50", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"160701315125", payerId:"3435782262", collectorId:"3166103110", date:"29/05/2026 07:26", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161489774008", payerId:"1752688746", collectorId:"3166103110", date:"29/05/2026 07:19", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161489249968", payerId:"1368596519", collectorId:"3166103110", date:"29/05/2026 07:12", status:"rejected", detail:"cc_rejected_high_risk", amount:35, method:"master", op:"regular_payment" },
  { id:"161490270848", payerId:"1587721064", collectorId:"3166103110", date:"29/05/2026 07:06", status:"approved", detail:"accredited", amount:350, method:"elo", op:"regular_payment" },
  { id:"161487213994", payerId:"1819502448", collectorId:"3166103110", date:"29/05/2026 06:48", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"161488940724", payerId:"1654479681", collectorId:"3166103110", date:"29/05/2026 06:46", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161489568130", payerId:"1466394524", collectorId:"3166103110", date:"29/05/2026 06:44", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161489374214", payerId:"1466394524", collectorId:"3166103110", date:"29/05/2026 06:43", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160696345979", payerId:"1466394524", collectorId:"3166103110", date:"29/05/2026 06:41", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160696434935", payerId:"1676320884", collectorId:"3166103110", date:"29/05/2026 06:18", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160696538613", payerId:"1812103129", collectorId:"3166103110", date:"29/05/2026 06:11", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161483607954", payerId:"1358136005", collectorId:"3166103110", date:"29/05/2026 05:46", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160690649953", payerId:"1673145088", collectorId:"3166103110", date:"29/05/2026 04:49", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161478077704", payerId:"1547668094", collectorId:"3166103110", date:"29/05/2026 02:50", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160688547303", payerId:"1353543406", collectorId:"3166103110", date:"29/05/2026 02:45", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161475404056", payerId:"1492577946", collectorId:"3166103110", date:"29/05/2026 01:10", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161471094588", payerId:"1655193952", collectorId:"3166103110", date:"28/05/2026 23:07", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160677880469", payerId:"1434018044", collectorId:"3166103110", date:"28/05/2026 22:27", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161464524652", payerId:"1994346698", collectorId:"3166103110", date:"28/05/2026 21:49", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161464154822", payerId:"1621687401", collectorId:"3166103110", date:"28/05/2026 21:47", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161463802964", payerId:"1621687401", collectorId:"3166103110", date:"28/05/2026 21:45", status:"rejected", detail:"cc_rejected_card_disabled", amount:35, method:"visa", op:"regular_payment" },
  { id:"160672771027", payerId:"2240058042", collectorId:"3166103110", date:"28/05/2026 21:36", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160672211101", payerId:"1604186983", collectorId:"3166103110", date:"28/05/2026 21:32", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160672486889", payerId:"1202745511", collectorId:"3166103110", date:"28/05/2026 21:31", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160672498757", payerId:"1604186983", collectorId:"3166103110", date:"28/05/2026 21:30", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:56, method:"master", op:"regular_payment" },
  { id:"161460448680", payerId:"1522463277", collectorId:"3166103110", date:"28/05/2026 21:07", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160668884093", payerId:"3064416658", collectorId:"3166103110", date:"28/05/2026 21:05", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160668910775", payerId:"1230834920", collectorId:"3166103110", date:"28/05/2026 20:55", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160667962393", payerId:"1563434166", collectorId:"3166103110", date:"28/05/2026 20:44", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"160663504253", payerId:"1606166571", collectorId:"3166103110", date:"28/05/2026 20:09", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161451923164", payerId:"1457137594", collectorId:"3166103110", date:"28/05/2026 20:05", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160659368971", payerId:"1708447453", collectorId:"3166103110", date:"28/05/2026 19:48", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161439023884", payerId:"2097803290", collectorId:"3166103110", date:"28/05/2026 18:48", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161439285866", payerId:"1601223375", collectorId:"3166103110", date:"28/05/2026 18:48", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161440430518", payerId:"1787162961", collectorId:"3166103110", date:"28/05/2026 18:43", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161432945186", payerId:"2082172478", collectorId:"3166103110", date:"28/05/2026 18:05", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160639281205", payerId:"1607212404", collectorId:"3166103110", date:"28/05/2026 17:44", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"160639640915", payerId:"1666470960", collectorId:"3166103110", date:"28/05/2026 17:43", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160639526555", payerId:"1703968861", collectorId:"3166103110", date:"28/05/2026 17:39", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"160638858461", payerId:"2016409504", collectorId:"3166103110", date:"28/05/2026 17:33", status:"approved", detail:"accredited", amount:35, method:"visa", op:"recurring_payment" },
  { id:"161426859300", payerId:"1970096830", collectorId:"3166103110", date:"28/05/2026 17:29", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161426482652", payerId:"1201896964", collectorId:"3166103110", date:"28/05/2026 17:20", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"160633408091", payerId:"1607610537", collectorId:"3166103110", date:"28/05/2026 17:16", status:"approved", detail:"accredited", amount:350, method:"amex", op:"regular_payment" },
  { id:"161426096172", payerId:"1534656485", collectorId:"3166103110", date:"28/05/2026 17:13", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160633463703", payerId:"1562599786", collectorId:"3166103110", date:"28/05/2026 17:12", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160632945659", payerId:"1820435893", collectorId:"3166103110", date:"28/05/2026 17:09", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160633188783", payerId:"1958562947", collectorId:"3166103110", date:"28/05/2026 17:03", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160627095797", payerId:"1268947725", collectorId:"3166103110", date:"28/05/2026 16:37", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160626345937", payerId:"2564459129", collectorId:"3166103110", date:"28/05/2026 16:33", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160627095257", payerId:"1394646757", collectorId:"3166103110", date:"28/05/2026 16:31", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160625320157", payerId:"1535370655", collectorId:"3166103110", date:"28/05/2026 16:07", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161412527844", payerId:"1582811130", collectorId:"3166103110", date:"28/05/2026 16:06", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"161412527752", payerId:"1649254098", collectorId:"3166103110", date:"28/05/2026 16:05", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161412873326", payerId:"1665389127", collectorId:"3166103110", date:"28/05/2026 16:03", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"160619600041", payerId:"1235563661", collectorId:"3166103110", date:"28/05/2026 15:48", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160619023173", payerId:"1500261946", collectorId:"3166103110", date:"28/05/2026 15:35", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160613934093", payerId:"1529129450", collectorId:"3166103110", date:"28/05/2026 15:07", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160613931877", payerId:"1607737384", collectorId:"3166103110", date:"28/05/2026 15:04", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160613697597", payerId:"1667908739", collectorId:"3166103110", date:"28/05/2026 15:00", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161404515116", payerId:"1608618180", collectorId:"3166103110", date:"28/05/2026 14:59", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160613696679", payerId:"1685505667", collectorId:"3166103110", date:"28/05/2026 14:48", status:"approved", detail:"accredited", amount:56, method:"elo", op:"regular_payment" },
  { id:"160613138959", payerId:"1527329133", collectorId:"3166103110", date:"28/05/2026 14:48", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161400399978", payerId:"1466394524", collectorId:"3166103110", date:"28/05/2026 14:39", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161399090530", payerId:"1578673957", collectorId:"3166103110", date:"28/05/2026 14:11", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161399090102", payerId:"1613782211", collectorId:"3166103110", date:"28/05/2026 14:06", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"160600922097", payerId:"1733365393", collectorId:"3166103110", date:"28/05/2026 13:29", status:"approved", detail:"accredited", amount:35, method:"amex", op:"regular_payment" },
  { id:"161393840326", payerId:"1758485016", collectorId:"3166103110", date:"28/05/2026 13:29", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:350, method:"master", op:"regular_payment" },
  { id:"160600706003", payerId:"1758485016", collectorId:"3166103110", date:"28/05/2026 13:26", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:350, method:"master", op:"regular_payment" },
  { id:"160600755457", payerId:"1466394524", collectorId:"3166103110", date:"28/05/2026 13:21", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:56, method:"master", op:"regular_payment" },
  { id:"160601822755", payerId:"1758485016", collectorId:"3166103110", date:"28/05/2026 13:20", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:350, method:"master", op:"regular_payment" },
  { id:"160601822611", payerId:"1684340283", collectorId:"3166103110", date:"28/05/2026 13:19", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161389161924", payerId:"1758485016", collectorId:"3166103110", date:"28/05/2026 13:15", status:"rejected", detail:"cc_rejected_insufficient_amount", amount:350, method:"master", op:"regular_payment" },
  { id:"161389086542", payerId:"1671122177", collectorId:"3166103110", date:"28/05/2026 12:58", status:"approved", detail:"accredited", amount:35, method:"elo", op:"regular_payment" },
  { id:"161388420860", payerId:"1590281327", collectorId:"3166103110", date:"28/05/2026 12:58", status:"approved", detail:"accredited", amount:56, method:"elo", op:"regular_payment" },
  { id:"161387089476", payerId:"2933025662", collectorId:"3166103110", date:"28/05/2026 12:57", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160594052763", payerId:"1519338721", collectorId:"3166103110", date:"28/05/2026 12:30", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"160593730177", payerId:"1606494443", collectorId:"3166103110", date:"28/05/2026 12:21", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160587554043", payerId:"1933544164", collectorId:"3166103110", date:"28/05/2026 12:06", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"160587127985", payerId:"1667003327", collectorId:"3166103110", date:"28/05/2026 12:03", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160587154557", payerId:"1894462161", collectorId:"3166103110", date:"28/05/2026 11:48", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160579187337", payerId:"1792093427", collectorId:"3166103110", date:"28/05/2026 11:10", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161365039800", payerId:"1945255940", collectorId:"3166103110", date:"28/05/2026 10:52", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161366952226", payerId:"1659579876", collectorId:"3166103110", date:"28/05/2026 10:45", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160572791349", payerId:"1484140576", collectorId:"3166103110", date:"28/05/2026 10:32", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160572791103", payerId:"1838848438", collectorId:"3166103110", date:"28/05/2026 10:29", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160571983281", payerId:"1265525820", collectorId:"3166103110", date:"28/05/2026 10:25", status:"rejected", detail:"cc_rejected_high_risk", amount:56, method:"master", op:"regular_payment" },
  { id:"160571883291", payerId:"1514735909", collectorId:"3166103110", date:"28/05/2026 10:24", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160565153747", payerId:"1815500727", collectorId:"3166103110", date:"28/05/2026 09:42", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160565702963", payerId:"1912296216", collectorId:"3166103110", date:"28/05/2026 09:36", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160565462825", payerId:"1912296216", collectorId:"3166103110", date:"28/05/2026 09:33", status:"rejected", detail:"cc_rejected_bad_filled_card_number", amount:56, method:"master", op:"regular_payment" },
  { id:"160565142647", payerId:"1581203984", collectorId:"3166103110", date:"28/05/2026 09:28", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161352197548", payerId:"1566390850", collectorId:"3166103110", date:"28/05/2026 09:18", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161352196990", payerId:"1555359166", collectorId:"3166103110", date:"28/05/2026 09:11", status:"approved", detail:"accredited", amount:35, method:"amex", op:"regular_payment" },
  { id:"161351065404", payerId:"1599256717", collectorId:"3166103110", date:"28/05/2026 09:10", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161351802722", payerId:"1600195052", collectorId:"3166103110", date:"28/05/2026 09:05", status:"approved", detail:"accredited", amount:56, method:"visa", op:"recurring_payment" },
  { id:"161352240296", payerId:"1600195052", collectorId:"3166103110", date:"28/05/2026 09:04", status:"rejected", detail:"cc_rejected_bad_filled_date", amount:56, method:"visa", op:"recurring_payment" },
  { id:"160559020761", payerId:"1559600815", collectorId:"3166103110", date:"28/05/2026 08:39", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160558592313", payerId:"1998998126", collectorId:"3166103110", date:"28/05/2026 08:31", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"161345533868", payerId:"1784034780", collectorId:"3166103110", date:"28/05/2026 08:25", status:"approved", detail:"accredited", amount:350, method:"master", op:"regular_payment" },
  { id:"161346216960", payerId:"1842289964", collectorId:"3166103110", date:"28/05/2026 08:21", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"161345698566", payerId:"1614691440", collectorId:"3166103110", date:"28/05/2026 08:12", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"160553990079", payerId:"1891394997", collectorId:"3166103110", date:"28/05/2026 08:08", status:"approved", detail:"accredited", amount:56, method:"visa", op:"regular_payment" },
  { id:"160553706047", payerId:"1891394997", collectorId:"3166103110", date:"28/05/2026 08:06", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:56, method:"master", op:"regular_payment" },
  { id:"160554314907", payerId:"3255242841", collectorId:"3166103110", date:"28/05/2026 07:58", status:"approved", detail:"accredited", amount:350, method:"visa", op:"regular_payment" },
  { id:"160554148285", payerId:"1559552633", collectorId:"3166103110", date:"28/05/2026 07:50", status:"approved", detail:"accredited", amount:35, method:"amex", op:"regular_payment" },
  { id:"161341030588", payerId:"1613699617", collectorId:"3166103110", date:"28/05/2026 07:23", status:"approved", detail:"accredited", amount:35, method:"visa", op:"regular_payment" },
  { id:"160549202711", payerId:"1530034030", collectorId:"3166103110", date:"28/05/2026 06:57", status:"approved", detail:"accredited", amount:56, method:"master", op:"regular_payment" },
  { id:"161336464760", payerId:"1615013446", collectorId:"3166103110", date:"28/05/2026 06:28", status:"rejected", detail:"cc_rejected_bad_filled_security_code", amount:35, method:"master", op:"regular_payment" },
  { id:"160545202003", payerId:"1586129248", collectorId:"3166103110", date:"28/05/2026 06:23", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" },
  { id:"160545018051", payerId:"1586129248", collectorId:"3166103110", date:"28/05/2026 06:19", status:"rejected", detail:"cc_rejected_call_for_authorize", amount:35, method:"master", op:"regular_payment" },
  { id:"161332497454", payerId:"1447323829", collectorId:"3166103110", date:"28/05/2026 05:33", status:"approved", detail:"accredited", amount:35, method:"master", op:"regular_payment" }
];

const COLLECTOR_ID = "3166103110";
const LAST_UPDATED = "29/05/2026 11:00";
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
  const d = r.date.split(" ")[0];
  return d > max ? d : max;
}, "");

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

export default function GWMDashboard() {
  const [metric,  setMetric]  = useState("qty");
  const [tryLast, setTryLast] = useState(false);
  const [period,  setPeriod]  = useState("24h"); // "total" | "24h" | "hoje"
  const [tab,     setTab]     = useState("overview");

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
    const key = timelineByHour
      ? r.date.split(" ")[1].split(":")[0] + "h"
      : r.date.split(" ")[0]; // dd/mm/yyyy
    if (!timelineMap[key]) timelineMap[key] = { key, apro_qty:0, rej_qty:0, apro_brl:0, rej_brl:0, tot_qty:0, tot_brl:0 };
    timelineMap[key].tot_qty++;
    timelineMap[key].tot_brl += r.amount;
    if (r.status === "approved") { timelineMap[key].apro_qty++; timelineMap[key].apro_brl += r.amount; }
    if (r.status === "rejected") { timelineMap[key].rej_qty++;  timelineMap[key].rej_brl  += r.amount; }
  });

  const hourData = Object.values(timelineMap)
    .sort((a, b) => a.key < b.key ? -1 : 1)
    .map(h => ({
      label: h.key,
      Aprovadas:  metric === "qty" ? h.apro_qty : h.apro_brl,
      Rejeitadas: metric === "qty" ? h.rej_qty  : h.rej_brl,
      apro_pct: pct(metric === "qty" ? h.apro_qty : h.apro_brl, metric === "qty" ? h.tot_qty : h.tot_brl),
    }));

  // Recusas empilhadas + linha
  const hourRejMap = {};
  data.forEach(r => {
    const key = timelineByHour
      ? r.date.split(" ")[1].split(":")[0] + "h"
      : r.date.split(" ")[0];
    if (!hourRejMap[key]) hourRejMap[key] = { key, _tot_qty:0, _apro_qty:0, _tot_brl:0, _apro_brl:0 };
    hourRejMap[key]._tot_qty++;
    hourRejMap[key]._tot_brl += r.amount;
    if (r.status === "approved") { hourRejMap[key]._apro_qty++; hourRejMap[key]._apro_brl += r.amount; }
    if (r.status === "rejected") {
      hourRejMap[key][r.detail+"_qty"] = (hourRejMap[key][r.detail+"_qty"]||0) + 1;
      hourRejMap[key][r.detail+"_brl"] = (hourRejMap[key][r.detail+"_brl"]||0) + r.amount;
    }
  });
  const hourRejData = Object.values(hourRejMap)
    .sort((a, b) => a.key < b.key ? -1 : 1)
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

          {/* Período: Total / Últimas 24h / Hoje */}
          <div style={{ display:"flex", background:"#0f172a", border:"1px solid #1e293b", borderRadius:7, padding:3 }}>
            {[["total","TOTAL"],["24h","ÚLTIMAS 24H"],["hoje","HOJE"]].map(([k,l]) => (
              <button key={k} className="mbtn" onClick={() => setPeriod(k)}
                style={{ background: period===k ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "none", color: period===k ? "#fff" : "#475569" }}>
                {l}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width:1, height:28, background:"#1e293b" }} />

          {/* QTD / R$ */}
          <div style={{ display:"flex", background:"#0f172a", border:"1px solid #1e293b", borderRadius:7, padding:3 }}>
            {[["qty","QTD"],["brl","R$"]].map(([k,l]) => (
              <button key={k} className="mbtn" onClick={() => setMetric(k)}
                style={{ background: metric===k ? "linear-gradient(135deg,#1d4ed8,#7c3aed)" : "none", color: metric===k ? "#fff" : "#475569" }}>
                {l}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width:1, height:28, background:"#1e293b" }} />

          {/* Último Intento */}
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
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display:"flex", gap:4, marginBottom:16, background:"#0f172a", borderRadius:7, padding:4, width:"fit-content", border:"1px solid #1e293b" }}>
        {[["overview","VISÃO GERAL"],["timeline","TIMELINE"],["transacoes","TRANSAÇÕES"]].map(([k,l]) => (
          <button key={k} className="tbtn" onClick={() => setTab(k)}
            style={{ color:tab===k?"#f1f5f9":"#475569", background:tab===k?"#1e3a5f":"none", fontWeight:tab===k?600:400 }}>
            {l}
          </button>
        ))}
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
      </div>
    </div>
  );
}
