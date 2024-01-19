-- Adminer 4.8.1 PostgreSQL 16.1 (Debian 16.1-1.pgdg120+1) dump

\connect "stock";

DROP TABLE IF EXISTS "compartment";
DROP SEQUENCE IF EXISTS compartment_id_seq;
CREATE SEQUENCE compartment_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 9 CACHE 1;

CREATE TABLE "public"."compartment" (
    "id" integer DEFAULT nextval('compartment_id_seq') NOT NULL,
    "capacity" integer NOT NULL,
    "conditions_id" integer NOT NULL,
    "placement_id" integer NOT NULL,
    CONSTRAINT "PK_966d64ee3dd270a3ee81a875d9f" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "compartment";
INSERT INTO "compartment" ("id", "capacity", "conditions_id", "placement_id") VALUES
(1,	100,	1,	1),
(2,	120,	1,	1),
(3,	200,	1,	1),
(4,	166,	1,	2),
(6,	200,	2,	2),
(7,	130,	3,	3),
(8,	100,	1,	3),
(9,	270,	2,	4);

DROP TABLE IF EXISTS "condition";
DROP SEQUENCE IF EXISTS condition_conditions_id_seq;
CREATE SEQUENCE condition_conditions_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 3 CACHE 1;

CREATE TABLE "public"."condition" (
    "conditions_id" integer DEFAULT nextval('condition_conditions_id_seq') NOT NULL,
    "conditions_type" condition_conditions_type_enum NOT NULL,
    CONSTRAINT "PK_737306cbc9d6b63fe3710cf1e8b" PRIMARY KEY ("conditions_id")
) WITH (oids = false);

TRUNCATE "condition";
INSERT INTO "condition" ("conditions_id", "conditions_type") VALUES
(1,	'frozen'),
(2,	'flammable'),
(3,	'fragile');

DROP TABLE IF EXISTS "placement";
DROP SEQUENCE IF EXISTS placement_id_seq;
CREATE SEQUENCE placement_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 4 CACHE 1;

CREATE TABLE "public"."placement" (
    "id" integer DEFAULT nextval('placement_id_seq') NOT NULL,
    "placement_floor" integer NOT NULL,
    "placement_name" character varying(255) NOT NULL,
    CONSTRAINT "PK_4f8b29ee2db5213bcb38b6c71c4" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "placement";
INSERT INTO "placement" ("id", "placement_floor", "placement_name") VALUES
(1,	1,	'Placement A'),
(2,	1,	'Placement B'),
(3,	2,	'Placement C'),
(4,	3,	'Placement D');

DROP TABLE IF EXISTS "product";
DROP SEQUENCE IF EXISTS product_product_id_seq;
CREATE SEQUENCE product_product_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 20 CACHE 1;

CREATE TABLE "public"."product" (
    "product_id" integer DEFAULT nextval('product_product_id_seq') NOT NULL,
    "product_name" character varying(255) NOT NULL,
    "conditions_id" integer,
    "unitUnitId" integer,
    CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id")
) WITH (oids = false);

TRUNCATE "product";
INSERT INTO "product" ("product_id", "product_name", "conditions_id", "unitUnitId") VALUES
(1,	'Milk',	1,	1),
(2,	'Sugar',	1,	1),
(3,	'Meat',	1,	2),
(19,	'Powder',	2,	NULL),
(20,	'Water',	1,	NULL);

DROP TABLE IF EXISTS "unit";
DROP SEQUENCE IF EXISTS unit_unit_id_seq;
CREATE SEQUENCE unit_unit_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 39 CACHE 1;

CREATE TABLE "public"."unit" (
    "unit_id" integer DEFAULT nextval('unit_unit_id_seq') NOT NULL,
    "init_capacity" integer NOT NULL,
    "receipt_date" date,
    "date_of_write_off" date,
    "status" unit_status_enum DEFAULT 'not_placed' NOT NULL,
    "compartment_id" integer,
    "product_id" integer NOT NULL,
    CONSTRAINT "PK_8893a61126ad0507e5d6a63ecb3" PRIMARY KEY ("unit_id")
) WITH (oids = false);

TRUNCATE "unit";
INSERT INTO "unit" ("unit_id", "init_capacity", "receipt_date", "date_of_write_off", "status", "compartment_id", "product_id") VALUES
(3,	33,	'2020-04-03',	'2023-04-03',	'not_placed',	NULL,	1),
(38,	12,	'2024-01-02',	'2024-01-16',	'not_placed',	6,	19),
(39,	100,	'2024-01-09',	'2024-01-25',	'placed',	4,	20),
(1,	30,	'2020-04-03',	'2022-05-16',	'written-off',	4,	1),
(11,	40,	'2024-01-24',	'2024-01-28',	'placed',	1,	2),
(2,	20,	'2022-04-03',	'2023-04-03',	'placed',	2,	2),
(13,	60,	'2024-01-24',	'2024-01-28',	'not_placed',	2,	1);

ALTER TABLE ONLY "public"."compartment" ADD CONSTRAINT "FK_330ecf91166708ad1e007811b1e" FOREIGN KEY (conditions_id) REFERENCES condition(conditions_id) ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."compartment" ADD CONSTRAINT "FK_fa8d5d7a96ae79af2ed881d4867" FOREIGN KEY (placement_id) REFERENCES placement(id) ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."product" ADD CONSTRAINT "FK_9bb389f7657797db59c54b2e8c1" FOREIGN KEY (conditions_id) REFERENCES condition(conditions_id) ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."product" ADD CONSTRAINT "FK_ab05485eaeb683d875490216b3d" FOREIGN KEY ("unitUnitId") REFERENCES unit(unit_id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."unit" ADD CONSTRAINT "FK_476982360b6b5c695e2af6839a3" FOREIGN KEY (compartment_id) REFERENCES compartment(id) ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."unit" ADD CONSTRAINT "FK_5537392a064aa6b75c6a96b5db1" FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE NOT DEFERRABLE;

-- 2024-01-19 14:36:50.644963+00
