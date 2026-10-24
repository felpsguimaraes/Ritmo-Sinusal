insert into public.sinus_tool_catalog(key,name,category) values
 ('matching','Associação de pares','Exercícios e revisão'),
 ('gap_fill','Completar lacunas','Exercícios e revisão');
insert into public.sinus_plan_tool_rules(plan_code,tool_key,operation)
 select p.code,t.key,o.op from (select code from public.subscription_plans union select 'free') p
 cross join (values ('matching'),('gap_fill')) t(key) cross join (values ('view'),('use'),('download')) o(op);
