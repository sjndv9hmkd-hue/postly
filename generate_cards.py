from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W,H=1080,1350
BG='#F6F0E5'; NAVY='#11243E'; CORAL='#F26B5E'; MINT='#B9D8CC'; INK='#142033'; MUTED='#617083'
OUT=Path('scheduled/2026-09-15'); OUT.mkdir(parents=True,exist_ok=True)
REG='/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
BOLD='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'

def f(size,bold=False): return ImageFont.truetype(BOLD if bold else REG,size)
def rounded(draw,box,r,fill,outline=None,width=1): draw.rounded_rectangle(box,radius=r,fill=fill,outline=outline,width=width)
def text(draw,xy,s,size,color=INK,bold=False,spacing=16,anchor=None,align='left'):
    draw.multiline_text(xy,s,font=f(size,bold),fill=color,spacing=spacing,anchor=anchor,align=align)
def base(i,dark=False):
    im=Image.new('RGB',(W,H),NAVY if dark else BG); d=ImageDraw.Draw(im)
    d.ellipse((790,-180,1190,220),fill=CORAL if dark else MINT)
    d.text((78,70),'POSTLY  ·  SELF MANAGEMENT',font=f(24,True),fill=BG if dark else NAVY)
    d.text((1002,70),f'{i:02d}/06',font=f(24,True),fill=BG if dark else NAVY,anchor='ra')
    d.line((78,111,1002,111),fill=(255,255,255) if dark else '#CFD2CE',width=2)
    return im,d
def save(im,i): im.save(OUT/f'{i:02d}.png',optimize=True)

# 1
im,d=base(1,True)
rounded(d,(78,188,280,244),28,CORAL); text(d,(179,217),'오늘의 자기관리',25,'white',True,anchor='mm')
text(d,(78,340),'의지만 세우면\n자꾸 미루는 이유',76,BG,True,spacing=24)
d.line((78,575,810,575),fill=CORAL,width=10)
text(d,(78,635),'목표보다 먼저\n‘시작 신호’를 정하세요',50,MINT,True,spacing=18)
text(d,(78,1180),'행동을 꺼내는 if–then 계획',29,BG)
save(im,1)

# 2
im,d=base(2)
text(d,(78,185),'계획이 멈추는 지점',58,NAVY,True)
rounded(d,(78,310,1002,620),40,'white')
text(d,(130,365),'“운동해야지”',62,CORAL,True)
text(d,(130,470),'해야 할 일은 있지만\n언제 시작할지가 비어 있어요.',38,INK,False,spacing=20)
text(d,(78,725),'실행 의도는',34,MUTED,True)
text(d,(78,790),'기회가 오는 순간과\n행동을 미리 연결합니다.',55,NAVY,True,spacing=20)
rounded(d,(78,1105,1002,1215),30,MINT); text(d,(540,1160),'“생각”을 “출발점”으로 바꾸는 설계',31,NAVY,True,anchor='mm')
save(im,2)

# 3
im,d=base(3,True)
text(d,(78,185),'공식은 단순해요',58,BG,True)
rounded(d,(78,315,1002,650),42,'white')
text(d,(130,370),'만약',31,MUTED,True)
text(d,(130,420),'[구체적 상황]이면,',51,NAVY,True)
text(d,(130,520),'나는 [작은 행동]을 한다.',47,CORAL,True)
text(d,(78,760),'예시',30,MINT,True)
text(d,(78,820),'퇴근 후 가방을 내려놓으면,\n운동복부터 입는다.',51,BG,True,spacing=22)
rounded(d,(78,1090,1002,1205),32,CORAL); text(d,(540,1148),'시간 + 장소 + 행동이 보이게 적기',31,'white',True,anchor='mm')
save(im,3)

# 4
im,d=base(4)
text(d,(78,185),'기분 말고, 보이는 신호',56,NAVY,True)
rounded(d,(78,320,1002,520),36,'#FCE0DC')
text(d,(130,370),'×  “의욕이 생기면”',45,CORAL,True)
text(d,(130,440),'감정은 시작점을 알아차리기 어렵습니다.',29,INK)
rounded(d,(78,575,1002,890),36,'#DDEDE7')
text(d,(130,625),'○  반복되는 장면',43,NAVY,True)
text(d,(130,715),'알람을 끈 뒤  ·  점심을 먹은 뒤\n현관문을 닫은 뒤  ·  노트북을 켠 뒤',35,INK,False,spacing=22)
text(d,(78,1010),'좋은 신호는',31,MUTED,True)
text(d,(78,1065),'구체적이고, 자주 오고, 알아차리기 쉽습니다.',39,NAVY,True)
save(im,4)

# 5
im,d=base(5,True)
text(d,(78,185),'실행률을 지키는 2가지',57,BG,True)
rounded(d,(78,325,1002,580),38,'white')
text(d,(130,375),'01  한 신호엔 한 행동',40,NAVY,True)
text(d,(130,455),'처음부터 여러 행동을 묶지 말고\n가장 작은 첫 동작만 연결하세요.',32,INK,spacing=18)
rounded(d,(78,635,1002,930),38,'white')
text(d,(130,685),'02  복구 규칙 하나',40,NAVY,True)
text(d,(130,765),'놓친 날을 실패로 끝내지 말고\n“다음 신호에서 다시 시작”을 적어두세요.',32,INK,spacing=18)
text(d,(78,1045),'작게 시작하고, 다음 기회를 남겨두기.',39,MINT,True)
text(d,(78,1215),'근거: Gollwitzer & Sheeran (2006) 메타분석',22,'#D6DED9')
save(im,5)

# 6
im,d=base(6)
text(d,(78,185),'오늘 할 일 하나만',60,NAVY,True)
text(d,(78,260),'아래 빈칸으로 바꿔보세요.',36,MUTED)
rounded(d,(78,385,1002,790),44,'white',outline=MINT,width=4)
text(d,(130,445),'만약',29,MUTED,True)
d.line((130,520,930,520),fill=CORAL,width=4)
text(d,(130,560),'이면, 나는',29,MUTED,True)
d.line((130,635,930,635),fill=CORAL,width=4)
text(d,(130,675),'한다.',29,MUTED,True)
rounded(d,(78,900,1002,1015),32,NAVY); text(d,(540,958),'메모해두고 다음 신호에서 바로 실행',32,'white',True,anchor='mm')
text(d,(540,1110),'저장 · 공유 · 팔로우',47,CORAL,True,anchor='mm')
text(d,(540,1180),'내일도 써먹는 한 단계 깊은 정보',28,NAVY,anchor='mm')
save(im,6)

print('generated', *[str(p) for p in sorted(OUT.glob('*.png'))])
