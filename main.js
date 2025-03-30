import { mainClasses, subClasses, uiConfig, skillConfig } from './config/classes.js';
import Mode1 from './scenes/mode1.js';
import Mode2 from './scenes/mode2.js';

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' }); 
        this.subClassesGroup = null;
        this.skillSetGroup = null;
        this.mainClassSprites = [];
        this.mainClassTexts = [];
        this.subClassSprites = [];
        this.startButton = null;
        this.mode1Button = null;
        this.mode2Button = null;
        this.selectedMainClass = null;
        this.selectedSubClass = null;
        this.selectedSkillSet = null;
        this.selectedMode = null;
    }   
    preload() {
        const ASSETS_PATH = 'assets/character/';
        
        mainClasses.forEach(({ image }) => {
            this.load.image(image, `${ASSETS_PATH}${image}.png`);
            this.load.image(`${image}1`, `${ASSETS_PATH}${image}1.png`);
        });

        Object.values(subClasses).flat().forEach(({ image }) => {
            this.load.image(image, `${ASSETS_PATH}${image}.png`);
            this.load.image(`${image}1`, `${ASSETS_PATH}${image}1.png`);
        });
        this.load.image('background', 'assets/background/background.png');
        this.load.image('startno', 'assets/background/startno.png');
        this.load.image('startyes', 'assets/background/startyes.png');
        this.load.image('mode1no', 'assets/background/modeno.png');
        this.load.image('mode1yes', 'assets/background/modeyes.png'); 
        this.load.image('mode2no', 'assets/background/modeno.png');   
        this.load.image('mode2yes', 'assets/background/modeyes.png');
        this.load.image('skillslot', 'assets/background/skillslot.png');
        this.load.image('MrangerC', 'assets/player/MrangerC.png');
        Object.keys(skillConfig).forEach(job => {
            skillConfig[job].skillSets.forEach((set, index) => {
                const useskills = set.useskills || []; 
                const allSkills = [...new Set([ 
                    ...set.talismans, 
                    ...set.skills, 
                    ...useskills
                ])];
                allSkills.forEach(skillNum => {
                    this.load.image(`${job}_skill${skillNum}`, `assets/skill/${job}/${skillNum}.png`);
                });
            });
        });
    }

    create() {
        this.mainClasses = mainClasses; 
        this.subClassMap = subClasses;
        // 1. 배경 추가 (가장 먼저)
        this.bg = this.add.image(0, 0, 'background')
            .setOrigin(0)
            .setDepth(0)

        // 2. UI 요소들 생성
        this.subClassesGroup = this.add.group().setVisible(false);
        this.skillSetGroup = this.add.group().setVisible(false);
        // 3. 시작 버튼 (높은 depth)
        this.startButton = this.add.sprite(820, 145, 'startno')
            .setInteractive()
            .on('pointerdown', () => this.handleStartClick());
        this.createModeButtons();
        // 4. 기타 요소들
        this.add.graphics()
            .lineStyle(1, 0xffffff)
            .strokeRect(0, 0, this.cameras.main.width, this.cameras.main.height)
            .setDepth(2);

        // 5. 배경 크기 조정
        const scaleX = this.cameras.main.width / this.bg.width;
        const scaleY = this.cameras.main.height / this.bg.height;
        const scale = Math.max(scaleX, scaleY);
        this.bg.setScale(scale);

        // 6. 메인 클래스 표시
        this.showMainClasses();
    }

    checkStartButton() {
        const canStart = this.selectedMainClass && 
                        this.selectedSubClass && 
                        this.selectedSkillSet && 
                        this.selectedMode;
        this.startButton.setTexture(canStart ? 'startyes' : 'startno');
        this.startButton.setInteractive(canStart);
    }

    update() {}

    createInteractiveObject(x, y, config, callback) {
        const image = this.add.image(x, y, config.image)
            .setInteractive()
            .on('pointerdown', () => callback(config))
            .setData('original', config.image);
        this.setupButtonHover(image); 

        const text = this.add.text(x, y + (config.type === 'main' ? 45 : 60), config.name, 
            config.type === 'main' ? uiConfig.mainClass.textStyle : uiConfig.subClass.textStyle
        ).setOrigin(0.5);
        text.on('pointerdown', () => callback(config));

        return { image, text };
    }

    createModeButtons() {
        // 버튼1: 연습모드
        this.button1 = this.add.sprite(700, 130, 'mode1no')
            .setInteractive()
            .on('pointerdown', () => this.handleModeSelect(1));
        
        this.add.text(700, 130, '연습모드', { 
            fontSize: '15px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // 버튼2: 재생모드
        this.button2 = this.add.sprite(700, 160, 'mode2no')
            .setInteractive()
            .on('pointerdown', () => this.handleModeSelect(2));
        
        this.add.text(700, 160, '재생모드', {
            fontSize: '15px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);
    }
    
    toggleActiveState(sprites, activeKey) {
        sprites.forEach(sprite => {
            const original = sprite.getData('original');
            sprite.setTexture(original === activeKey ? original : `${original}1`);
        });
    }
    setupButtonHover(button) {
        button.on('pointerover', () => {
            button.setScale(1.1);
            button.setAlpha(0.9);
        });
        
        button.on('pointerout', () => {
            button.setScale(1);
            button.setAlpha(1);
        });
    }
    showMainClasses() {
        const { startX, startY, spacing } = uiConfig.mainClass;
        
        this.mainClassSprites = [];
        this.mainClassTexts = [];

        this.mainClasses.forEach((cls, index) => {
            const btn = this.createInteractiveObject(
                startX + index * spacing, 
                startY, 
                { ...cls, type: 'main' }, 
                (config) => this.handleMainClassClick(config) 
            );
            this.mainClassSprites.push(btn.image);
            this.mainClassTexts.push(btn.text);
        });
    }
    showSubClasses() {
        const { 
            startX, 
            startY, 
            spacingX, 
            spacingY, 
            maxPerRow,
            textStyle   
        } = uiConfig.subClass; 

        this.subClassesGroup.clear(true, true); 
        this.subClassSprites = [];

        let currentRow = 0;
        let currentCol = 0;

        this.currentSubClasses.forEach((subClass) => {
            const x = startX + currentCol * spacingX;
            const y = startY + currentRow * spacingY;

            const text = this.add.text(x, y + 60, subClass.name, textStyle) 
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => this.handleSubClassClick(subClass));
                this.setupButtonHover(text);
            const image = this.add.image(x, y, subClass.image)
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => this.handleSubClassClick(subClass))
                .setData('original', subClass.image)
                this.setupButtonHover(image);
            this.subClassesGroup.add(image);
            this.subClassesGroup.add(text); 
            this.subClassSprites.push(image);
            currentCol++;
            if (currentCol >= maxPerRow) {
                currentCol = 0;
                currentRow++;
            }
            this.subClassesGroup.setVisible(true);             
        });

    }
    showSkillSets(jobKey) {
        if (this.skillSetGroup) this.skillSetGroup.destroy(true);
        this.skillSetGroup = this.add.group().setVisible(true);

        const { 
            startX, 
            startY, 
            skillSpacingX, 
            setSpacingY 
        } = uiConfig.skillSet;

        const skillSets = skillConfig[jobKey]?.skillSets || [];
        
        skillSets.forEach((set, index) => {
            const x = startX;
            const y = startY + (index * setSpacingY);

            const icons = [...set.talismans, ...set.skills].map((num, i) => {
                const icon = this.add.image(
                    x + (i * skillSpacingX), 
                    y, 
                    `${jobKey}_skill${num}`
                ).setScale(1.5);
                icon.setData('skillSetIndex', index); 
                return icon;
            });

            if (icons.length === 0) return;

            const iconWidth = icons[0].displayWidth;
            const iconHeight = icons[0].displayHeight;
            const totalWidth = (icons.length - 1) * skillSpacingX + iconWidth;

            const zone = this.add.zone(
                x + totalWidth/2 - iconWidth/2, 
                y, 
                totalWidth, 
                iconHeight
            )
            .setInteractive()
            // ✅ this.handleSkillSetSelect로 변경
            .on('pointerdown', () => this.handleSkillSetSelect(set, index));

            if (skillSets.length === 1 && index === 0) {
                zone.emit('pointerdown');
            }

            this.skillSetGroup.addMultiple([...icons, zone]);
        });
    }
    handleMainClassClick(selectedClass) {
        this.selectedMainClass = selectedClass; 
        this.selectedSubClass = null;

        this.toggleActiveState(this.mainClassSprites, selectedClass.image);
        this.currentSubClasses = this.subClassMap[selectedClass.subKey] || null;

        if (this.currentSubClasses) {
            this.showSubClasses(); 
        } else {
            this.subClassesGroup.setVisible(false); 
        }

        this.checkStartButton(); 
    }
    handleSubClassClick(selectedSub) {
        this.selectedSubClass = selectedSub; 
        this.toggleActiveState(this.subClassSprites, selectedSub.image);
        this.showSkillSets(selectedSub.image); 
        this.checkStartButton();
    }

    handleSkillSetSelect(set, selectedIndex) {
        this.skillSetGroup.getChildren().forEach(child => { 
            if (child instanceof Phaser.GameObjects.Image) {
                const skillSetIndex = child.data.get('skillSetIndex');
                child.setTint(skillSetIndex === selectedIndex ? 0xFFFFFF : 0x666666);
            }
        });
        this.selectedSkillSet = set; 
        this.checkStartButton();
    }
    handleModeSelect(modeNumber) {
        // 선택 시 버튼 이미지 변경
        this.button1.setTexture(modeNumber === 1 ? 'mode1yes' : 'mode1no');
        this.button2.setTexture(modeNumber === 2 ? 'mode2yes' : 'mode2no');
        this.selectedMode = modeNumber;
        this.checkStartButton();
    }

    handleStartClick() {
        if (!this.selectedMainClass || 
            !this.selectedSubClass || 
            !this.selectedSkillSet || 
            !this.selectedMode) return; 
    const characterConfig = {
        class: this.selectedSubClass.name,
        jobKey: this.selectedSubClass.image, 
        skills: this.selectedSkillSet,
        mode: this.selectedMode
    };

    if (this.selectedMode === 1) {
        this.scene.start('Mode1', { characterConfig });
    }

        if (this.selectedMode === 1) {
            this.scene.start('Mode1', { characterConfig });
        } else if (this.selectedMode === 2) {
            this.scene.start('Mode2', { characterConfig });
        }

        this.resetUI(); 
    }
    resetUI() {
        this.startButton.setVisible(false); 
        this.button1.setVisible(false);
        this.button2.setVisible(false);
        this.mainClassSprites.forEach(sprite => sprite.setVisible(false));
        this.mainClassTexts.forEach(text => text.setVisible(false));
        this.subClassesGroup.setVisible(false); 
        this.skillSetGroup.setVisible(false); 
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    scene: [MainScene, Mode1, Mode2]
};

const game = new Phaser.Game(config);